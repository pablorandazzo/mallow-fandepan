"""Publish the T-10 synthetic fixtures and QA evidence as static site assets."""

from hashlib import sha256
from pathlib import Path
from shutil import copyfile
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT.parent / "Trabajo revisado" / "Demo n8n T10"
TARGET = ROOT / "public" / "case-documents" / "t10-demo"

SAMPLES = [
    "01-correcto.png", "01-correcto.pdf", "02-duplicado.png", "02-duplicado.pdf",
    "03-monto-inconsistente.png", "03-monto-inconsistente.pdf",
    "04-monto-alto.png", "04-monto-alto.pdf",
    "05-proveedor-desconocido.png", "05-proveedor-desconocido.pdf",
    "06-instrucciones-en-documento.png", "06-instrucciones-en-documento.pdf",
    "07-servicios.png", "07-servicios.pdf", "08-no-comprobante.png",
    "09-archivo-falso.pdf", "10-primera-carga-para-presentar.png",
    "10-primera-carga-para-presentar.pdf", "11-factura-sintetica-89721981.png",
    "11-factura-sintetica-89721981.pdf", "referencias.json",
]
EVIDENCE = [
    "evidencia-confirmacion.png", "evidencia-duplicado.png",
    "evidencia-monto-inconsistente.png", "evidencia-revision-administrativa.png",
    "evidencia-revision-pdf.png", "evidencia-archivo-rechazado.png",
    "qa-runs.json", "final-tests.tap", "parent-red.tap", "parent-green.tap",
]
FEATURED_SAMPLES = [
    "10-primera-carga-para-presentar.png", "10-primera-carga-para-presentar.pdf",
    "11-factura-sintetica-89721981.png", "11-factura-sintetica-89721981.pdf",
]


def publish_folder(source_name, names, featured, archive_name):
    source = SOURCE / source_name
    destination = TARGET / source_name
    actual = {file.name for file in source.iterdir() if file.is_file()}
    if actual != set(names):
        raise ValueError(f"Unexpected files in {source}: missing={set(names) - actual}, extra={actual - set(names)}")
    destination.mkdir(parents=True, exist_ok=True)
    for name in featured:
        original = source / name
        published = destination / name
        copyfile(original, published)
        if sha256(original.read_bytes()).digest() != sha256(published.read_bytes()).digest():
            raise ValueError(f"Copy verification failed: {name}")
    with ZipFile(TARGET / archive_name, "w", compression=ZIP_DEFLATED) as archive:
        for name in names:
            archive.write(source / name, arcname=f"{source_name}/{name}")
    with ZipFile(TARGET / archive_name) as archive:
        if archive.testzip() is not None or set(archive.namelist()) != {f"{source_name}/{name}" for name in names}:
            raise ValueError(f"Archive verification failed: {archive_name}")


if __name__ == "__main__":
    TARGET.mkdir(parents=True, exist_ok=True)
    publish_folder("comprobantes_sinteticos", SAMPLES, FEATURED_SAMPLES, "comprobantes-sinteticos.zip")
    publish_folder("evidencia", EVIDENCE, [name for name in EVIDENCE if name.endswith(".png")], "evidencia-tecnica.zip")
    print(f"Published {len(SAMPLES)} synthetic fixtures and {len(EVIDENCE)} evidence files in two verified archives")
