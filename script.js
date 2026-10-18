const imageInput = document.getElementById('imageInput');
const formatSelect = document.getElementById('formatSelect');
const fillBgCheckbox = document.getElementById('fillBgCheckbox');
const colorPickerBox = document.getElementById('colorPickerBox');
const bgColorInput = document.getElementById('bgColor');
const convertBtn = document.getElementById('convertBtn');
const previewContainer = document.getElementById('previewContainer');
const previewList = document.getElementById('previewList');
const removeAllBtn = document.getElementById('removeAllBtn');
const resultsContainer = document.getElementById('resultsContainer');
const resultsList = document.getElementById('resultsList');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const transparentFormats = ['png', 'webp', 'avif', 'gif', 'x-icon'];
let selectedFiles = [];

// ==========================================
// DICCIONARIO DE TRADUCCIONES
// ==========================================
// El inglés viene directamente en el HTML.
const translations = {
  es: {
    subtitle: "Convertidor de Imágenes",
    labelSelect: "Selecciona tu(s) imagen(es):",
    dropZoneText: "Toca para seleccionar imágenes",
    dropZoneHint: "Soporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Vista previa:",
    removeAllBtn: "Quitar todas",
    labelFormat: "Convertir a:",
    labelFillBg: "Reemplazar transparencia con color",
    labelBgColor: "Color de fondo:",
    convertBtn: "Convertir Imagen",
    resultsTitle: "Imágenes Convertidas:",
    saveBtn: "Guardar",
    alertSelectImg: "Por favor, selecciona al menos una imagen."
  },
  pt: {
    subtitle: "Conversor de Imagens",
    labelSelect: "Selecione sua(s) imagem(ns):",
    dropZoneText: "Toque para selecionar imagens",
    dropZoneHint: "Suporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Pré-visualização:",
    removeAllBtn: "Remover todas",
    labelFormat: "Converter para:",
    labelFillBg: "Substituir transparência por cor",
    labelBgColor: "Cor de fundo:",
    convertBtn: "Converter Imagem",
    resultsTitle: "Imagens Convertidas:",
    saveBtn: "Salvar",
    alertSelectImg: "Por favor, selecione pelo menos uma imagem."
  },
  fr: {
    subtitle: "Convertisseur d'Images",
    labelSelect: "Sélectionnez votre/vos image(s) :",
    dropZoneText: "Appuyez pour sélectionner des images",
    dropZoneHint: "Prend en charge PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Aperçu :",
    removeAllBtn: "Tout supprimer",
    labelFormat: "Convertir en :",
    labelFillBg: "Remplacer la transparence par une couleur",
    labelBgColor: "Couleur de fond :",
    convertBtn: "Convertir l'Image",
    resultsTitle: "Images Converties :",
    saveBtn: "Enregistrer",
    alertSelectImg: "Veuillez sélectionner au moins une image."
  },
  de: {
    subtitle: "Bildkonverter",
    labelSelect: "Wählen Sie Ihr(e) Bild(er) aus:",
    dropZoneText: "Tippen, um Bilder auszuwählen",
    dropZoneHint: "Unterstützt PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Vorschau:",
    removeAllBtn: "Alle entfernen",
    labelFormat: "Konvertieren in:",
    labelFillBg: "Transparenz durch Farbe ersetzen",
    labelBgColor: "Hintergrundfarbe:",
    convertBtn: "Bild konvertieren",
    resultsTitle: "Konvertierte Bilder:",
    saveBtn: "Speichern",
    alertSelectImg: "Bitte wählen Sie mindestens ein Bild aus."
  },
  it: {
    subtitle: "Convertitore di Immagini",
    labelSelect: "Seleziona le tue immagini:",
    dropZoneText: "Tocca per selezionare le immagini",
    dropZoneHint: "Supporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Anteprima:",
    removeAllBtn: "Rimuovi tutto",
    labelFormat: "Converti in:",
    labelFillBg: "Sostituisci la trasparenza con il colore",
    labelBgColor: "Colore di sfondo:",
    convertBtn: "Converti Immagine",
    resultsTitle: "Immagini Convertite:",
    saveBtn: "Salva",
    alertSelectImg: "Per favore, seleziona almeno un'immagine."
  },
  ja: {
    subtitle: "画像変換ツール",
    labelSelect: "画像を選択してください:",
    dropZoneText: "タップして画像を選択",
    dropZoneHint: "PNG、JPG、WEBP、GIF、AVIF、BMP、ICO に対応",
    labelPreview: "プレビュー:",
    removeAllBtn: "すべて削除",
    labelFormat: "変換形式:",
    labelFillBg: "背景色で透過を置き換える",
    labelBgColor: "背景色:",
    convertBtn: "画像を変換",
    resultsTitle: "変換された画像:",
    saveBtn: "保存",
    alertSelectImg: "少なくとも1つの画像を選択してください。"
  },
  zh: {
    subtitle: "图片转换器",
    labelSelect: "选择您的图片:",
    dropZoneText: "点击选择图片",
    dropZoneHint: "支持 PNG、JPG、WEBP、GIF、AVIF、BMP、ICO",
    labelPreview: "预览:",
    removeAllBtn: "全部移除",
    labelFormat: "转换为:",
    labelFillBg: "用颜色替换透明度",
    labelBgColor: "背景颜色:",
    convertBtn: "转换图片",
    resultsTitle: "已转换的图片:",
    saveBtn: "保存",
    alertSelectImg: "请至少选择一张图片。"
  },
  ru: {
    subtitle: "Конвертер Изображений",
    labelSelect: "Выберите изображение(я):",
    dropZoneText: "Нажмите, чтобы выбрать изображения",
    dropZoneHint: "Поддерживает PNG, JPG, WEBP, GIF, AVIF, BMP, ICO",
    labelPreview: "Предварительный просмотр:",
    removeAllBtn: "Удалить все",
    labelFormat: "Конвертировать в:",
    labelFillBg: "Заменить прозрачность цветом",
    labelBgColor: "Цвет фона:",
    convertBtn: "Конвертировать Изображение",
    resultsTitle: "Преобразованные Изображения:",
    saveBtn: "Сохранить",
    alertSelectImg: "Пожалуйста, выберите хотя бы одно изображение."
  },
  ko: {
    subtitle: "이미지 변환기",
    labelSelect: "이미지를 선택하세요:",
    dropZoneText: "터치하여 이미지 선택",
    dropZoneHint: "PNG, JPG, WEBP, GIF, AVIF, BMP, ICO 지원",
    labelPreview: "미리보기:",
    removeAllBtn: "모두 제거",
    labelFormat: "변환할 형식:",
    labelFillBg: "투명도를 색상으로 교체",
    labelBgColor: "배경 색상:",
    convertBtn: "이미지 변환",
    resultsTitle: "변환된 이미지:",
    saveBtn: "저장",
    alertSelectImg: "최소 하나의 이미지를 선택해주세요."
  }
};

// Detectar los primeros 2 caracteres del idioma del navegador (ej. "it-IT" -> "it", "ja-JP" -> "ja")
const userLang = (navigator.language || navigator.userLanguage || '').substring(0, 2);

// Aplicar traducciones únicamente si el idioma está disponible
function applyTranslations() {
  if (translations[userLang]) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[userLang][key]) {
        element.textContent = translations[userLang][key];
      }
    });
  }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', applyTranslations);

// Helper para obtener textos dinámicos o usar inglés como respaldo
function getText(key, fallbackText) {
  return translations[userLang]?.[key] || fallbackText;
}

// ==========================================
// EVENTOS Y LÓGICA DE LA APLICACIÓN
// ==========================================

imageInput.addEventListener('change', () => {
  if (imageInput.files && imageInput.files.length > 0) {
    addFiles(Array.from(imageInput.files));
  }
});

removeAllBtn.addEventListener('click', () => {
  selectedFiles = [];
  imageInput.value = '';
  renderPreviews();
  resultsContainer.style.display = 'none';
});

fillBgCheckbox.addEventListener('change', () => {
  colorPickerBox.style.display = fillBgCheckbox.checked ? 'flex' : 'none';
});

function addFiles(files) {
  files.forEach(file => {
    selectedFiles.push(file);
  });
  renderPreviews();
}

function renderPreviews() {
  previewList.innerHTML = '';
  if (selectedFiles.length === 0) {
    previewContainer.style.display = 'none';
    return;
  }

  previewContainer.style.display = 'block';

  selectedFiles.forEach((file, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    const thumb = document.createElement('img');
    thumb.className = 'preview-thumb';
    const objectUrl = URL.createObjectURL(file);
    thumb.src = objectUrl;

    const info = document.createElement('div');
    info.className = 'preview-info';

    const name = document.createElement('div');
    name.className = 'preview-filename';
    name.textContent = file.name;

    const meta = document.createElement('div');
    meta.className = 'preview-size';
    meta.textContent = formatBytes(file.size);

    info.appendChild(name);
    info.appendChild(meta);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'item-remove-btn';
    removeBtn.innerHTML = '&times;';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      selectedFiles.splice(index, 1);
      renderPreviews();
    };

    item.appendChild(thumb);
    item.appendChild(info);
    item.appendChild(removeBtn);
    previewList.appendChild(item);
  });
}

convertBtn.addEventListener('click', async () => {
  if (selectedFiles.length === 0) {
    alert(getText('alertSelectImg', 'Please select at least one image.'));
    return;
  }

  resultsList.innerHTML = '';
  resultsContainer.style.display = 'block';

  const targetFormat = formatSelect.value;
  const mimeMap = {
    'png': 'image/png',
    'webp': 'image/webp',
    'jpeg': 'image/jpeg',
    'avif': 'image/avif',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'x-icon': 'image/x-icon'
  };

  const extMap = {
    'png': 'png',
    'webp': 'webp',
    'jpeg': 'jpg',
    'avif': 'avif',
    'gif': 'gif',
    'bmp': 'bmp',
    'x-icon': 'ico'
  };

  const isTransparent = transparentFormats.includes(targetFormat);

  for (let i = 0; i < selectedFiles.length; i++) {
    const file = selectedFiles[i];
    await processAndDisplay(file, targetFormat, mimeMap[targetFormat], extMap[targetFormat], isTransparent);
  }
});

function processAndDisplay(file, format, mimeType, ext, isTransparent) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        if (format === 'x-icon') {
          width = Math.min(width, 256);
          height = Math.min(height, 256);
        }

        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);

        if (fillBgCheckbox.checked || !isTransparent) {
          ctx.fillStyle = fillBgCheckbox.checked ? bgColorInput.value : '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        const outName = getOutputFilename(file.name, ext);

        canvas.toBlob((blob) => {
          let url;
          if (blob) {
            url = URL.createObjectURL(blob);
          } else {
            url = canvas.toDataURL('image/png');
          }
          createResultCard(url, outName);
          resolve();
        }, mimeType, 0.92);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function createResultCard(url, filename) {
  const item = document.createElement('div');
  item.className = 'result-item';

  const thumb = document.createElement('img');
  thumb.className = 'result-thumb';
  thumb.src = url;

  const info = document.createElement('div');
  info.className = 'result-info';

  const name = document.createElement('div');
  name.className = 'result-filename';
  name.textContent = filename;

  info.appendChild(name);

  const downloadBtn = document.createElement('a');
  downloadBtn.className = 'download-link-btn';
  downloadBtn.href = url;
  downloadBtn.download = filename;
  downloadBtn.textContent = getText('saveBtn', 'Save');

  item.appendChild(thumb);
  item.appendChild(info);
  item.appendChild(downloadBtn);

  resultsList.appendChild(item);
}

function getOutputFilename(originalName, newExt) {
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
  return `${baseName}.${newExt}`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 KB';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
