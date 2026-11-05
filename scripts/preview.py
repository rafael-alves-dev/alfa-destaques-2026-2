from pathlib import Path
from PIL import Image
im=Image.open('qa/desktop.png');im.crop((0,0,1440,825)).save('qa/preview.png')
