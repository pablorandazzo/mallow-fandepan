"""Create local reading PDFs with Word; never change or publish source files."""
from pathlib import Path
import hashlib
import json
import win32com.client

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent.parent / 'Contexto' / 'Templates Resueltos'
OUTPUT = ROOT / '.local-documents'
FILES = {
    'T-01': 'TPL 01 actualizado.docx',
    'T-02': 'TPL 02 actualizado.docx',
    'T-03': 'TPL 03 actualizado.docx',
    'T-04': 'TPL 04 actualizado.docx',
    'T-05': 'TPL 05 actualizado.docx',
    'T-07': 'TPL 07 actualizado.docx',
    'T-08': 'TPL 08 v1.docx',
    'T-09': 'TPL 09.docx',
}


def prepare():
    OUTPUT.mkdir(exist_ok=True)
    word = win32com.client.DispatchEx('Word.Application')
    word.Visible = False
    word.DisplayAlerts = 0
    word.AutomationSecurity = 3
    results = []
    try:
        for identifier, name in FILES.items():
            source = SOURCE / name
            original_hash = hashlib.sha256(source.read_bytes()).hexdigest()
            target = OUTPUT / f'{identifier.lower()}.pdf'
            document = None
            try:
                document = word.Documents.Open(str(source), ConfirmConversions=False, ReadOnly=True, AddToRecentFiles=False, Visible=False)
                document.ExportAsFixedFormat(str(target), 17, OpenAfterExport=False)
                pages = document.ComputeStatistics(2)
            finally:
                if document is not None:
                    document.Close(SaveChanges=False)
            if hashlib.sha256(source.read_bytes()).hexdigest() != original_hash:
                raise RuntimeError(f'Source file changed unexpectedly: {identifier}')
            if target.read_bytes()[:5] != b'%PDF-':
                raise RuntimeError(f'Invalid PDF: {identifier}')
            results.append({'id': identifier, 'pages': pages, 'bytes': target.stat().st_size, 'sourceUnchanged': True})
            print(json.dumps(results[-1]), flush=True)
    finally:
        word.Quit(SaveChanges=False)
    (OUTPUT / 'conversion-report.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
    print(json.dumps({'converted': len(results), 'output': str(OUTPUT), 'published': False}))


if __name__ == '__main__':
    prepare()
