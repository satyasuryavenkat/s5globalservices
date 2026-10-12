from pathlib import Path
from PIL import Image, ImageOps

for path in Path('public/images/machinery').glob('*.jpg'):
    with Image.open(path) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((1280, 960), Image.Resampling.LANCZOS)
        image.save(path, quality=85, optimize=True, progressive=True)
        print(f'{path.name}: {image.width} x {image.height}, {path.stat().st_size:,} bytes')
