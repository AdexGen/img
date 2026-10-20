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
const dropZone = document.getElementById('dropZone');
const sizeSelect = document.getElementById('sizeSelect');
const qualityGroup = document.getElementById('qualityGroup');
const qualityRange = document.getElementById('qualityRange');
const qualityValue = document.getElementById('qualityValue');
const zipBtn = document.getElementById('zipBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

const transparentFormats = ['png', 'webp', 'avif', 'gif', 'x-icon'];
let selectedFiles = [];
let previewUrls = [];
let resultUrls = [];
let resultFiles = [];

// Imagen de reemplazo para miniaturas que el navegador no puede mostrar (ej. HEIC)
const PLACEHOLDER_THUMB = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><rect width="44" height="44" rx="8" fill="#151b28"/>' +
  '<path d="M10 33l9-11 6 7 4-5 6 9z" fill="#9aa6bb"/><circle cx="30" cy="14" r="3.5" fill="#9aa6bb"/></svg>'
);

// ==========================================
// DICCIONARIO DE TRADUCCIONES
// ==========================================
// El inglés viene directamente en el HTML.
const translations = {
  es: {
    subtitle: "Convertidor de Imágenes",
    labelSelect: "Selecciona tu(s) imagen(es):",
    dropZoneText: "Toca para seleccionar imágenes",
    dropZoneHint: "Soporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Vista previa:",
    removeAllBtn: "Quitar todas",
    labelFormat: "Convertir a:",
    labelFillBg: "Reemplazar transparencia con color",
    labelBgColor: "Color de fondo:",
    convertBtn: "Convertir Imagen",
    resultsTitle: "Imágenes Convertidas:",
    saveBtn: "Guardar",
    alertSelectImg: "Por favor, selecciona al menos una imagen.",
    errorLoad: "No se pudo leer esta imagen.",
    errorFormat: "Tu navegador no puede crear este formato.",
    privacyText: "Procesamiento 100% local — Tus imágenes nunca salen de tu dispositivo",
    labelQuality: "Calidad:",
    labelSize: "Tamaño:",
    sizeOriginal: "Original",
    zipBtn: "Descargar todo (ZIP)",
    converting: "Convirtiendo…"
  },
  pt: {
    subtitle: "Conversor de Imagens",
    labelSelect: "Selecione sua(s) imagem(ns):",
    dropZoneText: "Toque para selecionar imagens",
    dropZoneHint: "Suporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Pré-visualização:",
    removeAllBtn: "Remover todas",
    labelFormat: "Converter para:",
    labelFillBg: "Substituir transparência por cor",
    labelBgColor: "Cor de fundo:",
    convertBtn: "Converter Imagem",
    resultsTitle: "Imagens Convertidas:",
    saveBtn: "Salvar",
    alertSelectImg: "Por favor, selecione pelo menos uma imagem.",
    errorLoad: "Não foi possível ler esta imagem.",
    errorFormat: "Seu navegador não consegue criar este formato.",
    privacyText: "Processamento 100% local — Suas imagens nunca saem do seu dispositivo",
    labelQuality: "Qualidade:",
    labelSize: "Tamanho:",
    sizeOriginal: "Original",
    zipBtn: "Baixar tudo (ZIP)",
    converting: "Convertendo…"
  },
  fr: {
    subtitle: "Convertisseur d'Images",
    labelSelect: "Sélectionnez votre/vos image(s) :",
    dropZoneText: "Appuyez pour sélectionner des images",
    dropZoneHint: "Prend en charge PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Aperçu :",
    removeAllBtn: "Tout supprimer",
    labelFormat: "Convertir en :",
    labelFillBg: "Remplacer la transparence par une couleur",
    labelBgColor: "Couleur de fond :",
    convertBtn: "Convertir l'Image",
    resultsTitle: "Images Converties :",
    saveBtn: "Enregistrer",
    alertSelectImg: "Veuillez sélectionner au moins une image.",
    errorLoad: "Impossible de lire cette image.",
    errorFormat: "Votre navigateur ne peut pas créer ce format.",
    privacyText: "Traitement 100 % local — Vos images ne quittent jamais votre appareil",
    labelQuality: "Qualité :",
    labelSize: "Taille :",
    sizeOriginal: "Original",
    zipBtn: "Tout télécharger (ZIP)",
    converting: "Conversion…"
  },
  de: {
    subtitle: "Bildkonverter",
    labelSelect: "Wählen Sie Ihr(e) Bild(er) aus:",
    dropZoneText: "Tippen, um Bilder auszuwählen",
    dropZoneHint: "Unterstützt PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Vorschau:",
    removeAllBtn: "Alle entfernen",
    labelFormat: "Konvertieren in:",
    labelFillBg: "Transparenz durch Farbe ersetzen",
    labelBgColor: "Hintergrundfarbe:",
    convertBtn: "Bild konvertieren",
    resultsTitle: "Konvertierte Bilder:",
    saveBtn: "Speichern",
    alertSelectImg: "Bitte wählen Sie mindestens ein Bild aus.",
    errorLoad: "Dieses Bild konnte nicht gelesen werden.",
    errorFormat: "Ihr Browser kann dieses Format nicht erzeugen.",
    privacyText: "100 % lokale Verarbeitung — Ihre Bilder verlassen nie Ihr Gerät",
    labelQuality: "Qualität:",
    labelSize: "Größe:",
    sizeOriginal: "Original",
    zipBtn: "Alle herunterladen (ZIP)",
    converting: "Konvertiere…"
  },
  it: {
    subtitle: "Convertitore di Immagini",
    labelSelect: "Seleziona le tue immagini:",
    dropZoneText: "Tocca per selezionare le immagini",
    dropZoneHint: "Supporta PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Anteprima:",
    removeAllBtn: "Rimuovi tutto",
    labelFormat: "Converti in:",
    labelFillBg: "Sostituisci la trasparenza con il colore",
    labelBgColor: "Colore di sfondo:",
    convertBtn: "Converti Immagine",
    resultsTitle: "Immagini Convertite:",
    saveBtn: "Salva",
    alertSelectImg: "Per favore, seleziona almeno un'immagine.",
    errorLoad: "Impossibile leggere questa immagine.",
    errorFormat: "Il tuo browser non può creare questo formato.",
    privacyText: "Elaborazione 100% locale — Le tue immagini non lasciano mai il tuo dispositivo",
    labelQuality: "Qualità:",
    labelSize: "Dimensioni:",
    sizeOriginal: "Originale",
    zipBtn: "Scarica tutto (ZIP)",
    converting: "Conversione…"
  },
  ja: {
    subtitle: "画像変換ツール",
    labelSelect: "画像を選択してください:",
    dropZoneText: "タップして画像を選択",
    dropZoneHint: "PNG、JPG、WEBP、GIF、AVIF、BMP、ICO、HEIC、SVG に対応",
    labelPreview: "プレビュー:",
    removeAllBtn: "すべて削除",
    labelFormat: "変換形式:",
    labelFillBg: "背景色で透過を置き換える",
    labelBgColor: "背景色:",
    convertBtn: "画像を変換",
    resultsTitle: "変換された画像:",
    saveBtn: "保存",
    alertSelectImg: "少なくとも1つの画像を選択してください。",
    errorLoad: "この画像を読み込めませんでした。",
    errorFormat: "お使いのブラウザではこの形式を作成できません。",
    privacyText: "100%ローカル処理 — 画像がお使いのデバイスの外に出ることはありません",
    labelQuality: "品質:",
    labelSize: "サイズ:",
    sizeOriginal: "オリジナル",
    zipBtn: "すべてダウンロード (ZIP)",
    converting: "変換中…"
  },
  zh: {
    subtitle: "图片转换器",
    labelSelect: "选择您的图片:",
    dropZoneText: "点击选择图片",
    dropZoneHint: "支持 PNG、JPG、WEBP、GIF、AVIF、BMP、ICO、HEIC、SVG",
    labelPreview: "预览:",
    removeAllBtn: "全部移除",
    labelFormat: "转换为:",
    labelFillBg: "用颜色替换透明度",
    labelBgColor: "背景颜色:",
    convertBtn: "转换图片",
    resultsTitle: "已转换的图片:",
    saveBtn: "保存",
    alertSelectImg: "请至少选择一张图片。",
    errorLoad: "无法读取此图片。",
    errorFormat: "您的浏览器无法生成此格式。",
    privacyText: "100% 本地处理 — 您的图片不会离开您的设备",
    labelQuality: "质量:",
    labelSize: "尺寸:",
    sizeOriginal: "原始大小",
    zipBtn: "全部下载 (ZIP)",
    converting: "转换中…"
  },
  ru: {
    subtitle: "Конвертер Изображений",
    labelSelect: "Выберите изображение(я):",
    dropZoneText: "Нажмите, чтобы выбрать изображения",
    dropZoneHint: "Поддерживает PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG",
    labelPreview: "Предварительный просмотр:",
    removeAllBtn: "Удалить все",
    labelFormat: "Конвертировать в:",
    labelFillBg: "Заменить прозрачность цветом",
    labelBgColor: "Цвет фона:",
    convertBtn: "Конвертировать Изображение",
    resultsTitle: "Преобразованные Изображения:",
    saveBtn: "Сохранить",
    alertSelectImg: "Пожалуйста, выберите хотя бы одно изображение.",
    errorLoad: "Не удалось прочитать это изображение.",
    errorFormat: "Ваш браузер не может создать этот формат.",
    privacyText: "100% локальная обработка — ваши изображения никогда не покидают устройство",
    labelQuality: "Качество:",
    labelSize: "Размер:",
    sizeOriginal: "Оригинал",
    zipBtn: "Скачать всё (ZIP)",
    converting: "Конвертация…"
  },
  ko: {
    subtitle: "이미지 변환기",
    labelSelect: "이미지를 선택하세요:",
    dropZoneText: "터치하여 이미지 선택",
    dropZoneHint: "PNG, JPG, WEBP, GIF, AVIF, BMP, ICO, HEIC, SVG 지원",
    labelPreview: "미리보기:",
    removeAllBtn: "모두 제거",
    labelFormat: "변환할 형식:",
    labelFillBg: "투명도를 색상으로 교체",
    labelBgColor: "배경 색상:",
    convertBtn: "이미지 변환",
    resultsTitle: "변환된 이미지:",
    saveBtn: "저장",
    alertSelectImg: "최소 하나의 이미지를 선택해주세요.",
    errorLoad: "이 이미지를 읽을 수 없습니다.",
    errorFormat: "브라우저에서 이 형식을 만들 수 없습니다.",
    privacyText: "100% 로컬 처리 — 이미지가 기기 밖으로 나가지 않습니다",
    labelQuality: "품질:",
    labelSize: "크기:",
    sizeOriginal: "원본",
    zipBtn: "모두 다운로드 (ZIP)",
    converting: "변환 중…"
  }
};

// Detectar los primeros 2 caracteres del idioma del navegador (ej. "it-IT" -> "it", "ja-JP" -> "ja")
const userLang = (navigator.language || navigator.userLanguage || '').substring(0, 2).toLowerCase();

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

// Ejecutar al cargar la página (funciona aunque el DOM ya esté listo)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyTranslations);
} else {
  applyTranslations();
}

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
  // Permite volver a seleccionar el mismo archivo y que se dispare "change"
  imageInput.value = '';
});

removeAllBtn.addEventListener('click', () => {
  selectedFiles = [];
  imageInput.value = '';
  renderPreviews();
  clearResults();
  resultsContainer.style.display = 'none';
});

fillBgCheckbox.addEventListener('change', () => {
  colorPickerBox.style.display = fillBgCheckbox.checked ? 'flex' : 'none';
});

// Calidad: solo tiene sentido en formatos con compresión
const qualityFormats = ['jpeg', 'webp', 'avif', 'pdf'];

function updateQualityVisibility() {
  qualityGroup.style.display = qualityFormats.includes(formatSelect.value) ? 'block' : 'none';
}

formatSelect.addEventListener('change', updateQualityVisibility);

qualityRange.addEventListener('input', () => {
  qualityValue.textContent = qualityRange.value + '%';
});

// Oculta los formatos que este navegador no sabe crear (así nadie ve un error)
function canEncode(mime) {
  try {
    return document.createElement('canvas').toDataURL(mime).startsWith('data:' + mime);
  } catch (err) {
    return false;
  }
}

['webp', 'avif'].forEach(fmt => {
  if (!canEncode('image/' + fmt)) {
    const option = formatSelect.querySelector('option[value="' + fmt + '"]');
    if (option) option.remove();
  }
});

updateQualityVisibility();

// Arrastrar y soltar
['dragenter', 'dragover'].forEach(evt => {
  dropZone.addEventListener(evt, (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
});

['dragleave', 'dragend'].forEach(evt => {
  dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'));
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  if (e.dataTransfer && e.dataTransfer.files.length > 0) {
    addFiles(Array.from(e.dataTransfer.files));
  }
});

// Evita que soltar una imagen fuera de la zona la abra en la pestaña
['dragover', 'drop'].forEach(evt => {
  window.addEventListener(evt, (e) => e.preventDefault());
});

// Descargar todo en un ZIP
zipBtn.addEventListener('click', async () => {
  if (resultFiles.length < 2) return;
  zipBtn.disabled = true;
  try {
    const blob = await createZip(resultFiles);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'silix-img.zip';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } finally {
    zipBtn.disabled = false;
  }
});

function isHeic(file) {
  return /image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
}

function isImageFile(file) {
  return (file.type && file.type.startsWith('image/')) ||
    /\.(png|jpe?g|webp|gif|avif|bmp|ico|svg|heic|heif)$/i.test(file.name);
}

function addFiles(files) {
  files.forEach(file => {
    if (isImageFile(file)) {
      selectedFiles.push(file);
    }
  });
  renderPreviews();
}

function revokeUrls(list) {
  list.forEach(url => URL.revokeObjectURL(url));
  list.length = 0;
}

function clearResults() {
  revokeUrls(resultUrls);
  resultFiles = [];
  resultsList.innerHTML = '';
  zipBtn.style.display = 'none';
}

function renderPreviews() {
  revokeUrls(previewUrls);
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
    previewUrls.push(objectUrl);
    thumb.onerror = () => {
      thumb.onerror = null;
      thumb.src = PLACEHOLDER_THUMB;
    };
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

const nextFrame = () => new Promise(resolve => {
  requestAnimationFrame(() => setTimeout(resolve, 0));
});

convertBtn.addEventListener('click', async () => {
  if (selectedFiles.length === 0) {
    alert(getText('alertSelectImg', 'Please select at least one image.'));
    return;
  }

  // Evita doble clic mientras se está convirtiendo
  convertBtn.disabled = true;
  const originalLabel = convertBtn.textContent;

  clearResults();
  resultsContainer.style.display = 'block';

  const targetFormat = formatSelect.value;
  const mimeMap = {
    'png': 'image/png',
    'webp': 'image/webp',
    'jpeg': 'image/jpeg',
    'avif': 'image/avif',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'x-icon': 'image/x-icon',
    'pdf': 'application/pdf'
  };

  const extMap = {
    'png': 'png',
    'webp': 'webp',
    'jpeg': 'jpg',
    'avif': 'avif',
    'gif': 'gif',
    'bmp': 'bmp',
    'x-icon': 'ico',
    'pdf': 'pdf'
  };

  const isTransparent = transparentFormats.includes(targetFormat);
  const usedNames = new Set();
  const total = selectedFiles.length;

  try {
    for (let i = 0; i < total; i++) {
      const file = selectedFiles[i];

      // Progreso visible: "Convirtiendo… 2/5"
      convertBtn.textContent = getText('converting', 'Converting…') + ' ' + (i + 1) + '/' + total;
      await nextFrame();

      const outName = uniqueName(getOutputFilename(file.name, extMap[targetFormat]), usedNames);
      try {
        const { blob, preview } = await convertFile(file, targetFormat, mimeMap[targetFormat], isTransparent);
        const url = URL.createObjectURL(blob);
        resultUrls.push(url);

        let thumbUrl = url;
        if (preview) {
          thumbUrl = URL.createObjectURL(preview);
          resultUrls.push(thumbUrl);
        }

        resultFiles.push({ name: outName, blob });
        createResultCard(url, outName, thumbUrl);
      } catch (err) {
        console.error(err);
        const msg = err && err.message === 'unsupported'
          ? getText('errorFormat', 'Your browser cannot create this format.')
          : getText('errorLoad', 'Could not read this image.');
        createErrorCard(outName, msg);
      }
    }

    zipBtn.style.display = resultFiles.length >= 2 ? 'inline-flex' : 'none';
  } finally {
    // Libera la memoria del canvas
    canvas.width = 1;
    canvas.height = 1;
    convertBtn.textContent = originalLabel;
    convertBtn.disabled = false;
  }
});

// ==========================================
// CONVERSIÓN
// ==========================================

function loadImageFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('load'));
    };
    img.src = url;
  });
}

// HEIC (fotos de iPhone): Safari lo abre solo; en el resto se convierte con una
// librería que se descarga únicamente cuando hace falta. La imagen se procesa
// igual en tu dispositivo: solo se descarga el código de la librería.
let heicLoader = null;

function loadHeicLibrary() {
  if (window.heic2any) return Promise.resolve();
  if (!heicLoader) {
    heicLoader = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
      script.onload = resolve;
      script.onerror = () => {
        heicLoader = null;
        reject(new Error('heic-library'));
      };
      document.head.appendChild(script);
    });
  }
  return heicLoader;
}

async function heicToPng(file) {
  await loadHeicLibrary();
  const result = await window.heic2any({ blob: file, toType: 'image/png' });
  return Array.isArray(result) ? result[0] : result;
}

async function loadImage(file) {
  try {
    return await loadImageFromBlob(file);
  } catch (err) {
    if (!isHeic(file)) throw err;
    const converted = await heicToPng(file);
    return loadImageFromBlob(converted);
  }
}

function canvasToBlob(mimeType, quality) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

async function convertFile(file, format, mimeType, isTransparent) {
  const img = await loadImage(file);

  let width = img.naturalWidth || img.width || 512;
  let height = img.naturalHeight || img.height || 512;

  // Tamaño elegido: porcentaje (p75, p50, p25) o lado mayor en píxeles (nunca agranda)
  const size = sizeSelect.value;
  if (size.charAt(0) === 'p') {
    const factor = parseInt(size.slice(1), 10) / 100;
    width = Math.max(1, Math.round(width * factor));
    height = Math.max(1, Math.round(height * factor));
  } else if (size !== 'original') {
    const scale = Math.min(1, parseInt(size, 10) / Math.max(width, height));
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
  }

  // ICO: máximo 256x256 manteniendo la proporción
  if (format === 'x-icon') {
    const scale = Math.min(1, 256 / Math.max(width, height));
    width = Math.max(1, Math.round(width * scale));
    height = Math.max(1, Math.round(height * scale));
  }

  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (fillBgCheckbox.checked || !isTransparent) {
    ctx.fillStyle = fillBgCheckbox.checked ? bgColorInput.value : '#ffffff';
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  return encodeCanvas(format, mimeType, width, height);
}

// Devuelve { blob, preview }: "preview" es una imagen para la miniatura cuando el
// resultado no se puede mostrar directamente (por ejemplo, un PDF).
async function encodeCanvas(format, mimeType, width, height) {
  const quality = Math.min(1, Math.max(0.1, Number(qualityRange.value) / 100));

  // Formatos que el navegador NO sabe crear con toBlob: los generamos a mano
  if (format === 'bmp') {
    return { blob: encodeBMP(width, height) };
  }

  if (format === 'gif') {
    return { blob: encodeGIF(width, height, ctx.getImageData(0, 0, width, height).data) };
  }

  if (format === 'x-icon') {
    const png = await canvasToBlob('image/png');
    if (!png) throw new Error('unsupported');
    return { blob: await encodeICO(png, width, height) };
  }

  if (format === 'pdf') {
    const jpeg = await canvasToBlob('image/jpeg', quality);
    if (!jpeg || jpeg.type !== 'image/jpeg') throw new Error('unsupported');
    const bytes = new Uint8Array(await jpeg.arrayBuffer());
    return { blob: encodePDF(bytes, width, height), preview: jpeg };
  }

  // PNG, JPEG, WEBP, AVIF: si el navegador no soporta el formato,
  // devuelve PNG en silencio. Lo detectamos para no entregar un archivo mal etiquetado.
  const blob = await canvasToBlob(mimeType, quality);
  if (!blob || blob.type !== mimeType) {
    throw new Error('unsupported');
  }
  return { blob };
}

// ---------- BMP (24 bits) ----------
function encodeBMP(width, height) {
  const data = ctx.getImageData(0, 0, width, height).data;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelSize = rowSize * height;
  const buffer = new ArrayBuffer(54 + pixelSize);
  const view = new DataView(buffer);
  const out = new Uint8Array(buffer);

  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4D); // 'M'
  view.setUint32(2, 54 + pixelSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, pixelSize, true);
  view.setInt32(38, 2835, true);
  view.setInt32(42, 2835, true);

  let p = 54;
  for (let y = height - 1; y >= 0; y--) {
    const rowStart = p;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      out[p++] = data[i + 2];
      out[p++] = data[i + 1];
      out[p++] = data[i];
    }
    p = rowStart + rowSize;
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

// ---------- ICO (PNG incrustado) ----------
async function encodeICO(pngBlob, width, height) {
  const png = new Uint8Array(await pngBlob.arrayBuffer());
  const buffer = new ArrayBuffer(22 + png.length);
  const view = new DataView(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true); // tipo: icono
  view.setUint16(4, 1, true); // una imagen
  view.setUint8(6, width >= 256 ? 0 : width);
  view.setUint8(7, height >= 256 ? 0 : height);
  view.setUint8(8, 0);
  view.setUint8(9, 0);
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, png.length, true);
  view.setUint32(18, 22, true);
  new Uint8Array(buffer, 22).set(png);

  return new Blob([buffer], { type: 'image/x-icon' });
}

// ---------- GIF (1 fotograma, paleta web de 216 colores + transparencia) ----------
function encodeGIF(width, height, data) {
  const TRANSPARENT = 255;
  const total = width * height;
  const indices = new Uint8Array(total);
  const work = new Float32Array(total * 3);

  for (let i = 0; i < total; i++) {
    work[i * 3] = data[i * 4];
    work[i * 3 + 1] = data[i * 4 + 1];
    work[i * 3 + 2] = data[i * 4 + 2];
  }

  const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : v);
  const spread = (x, y, dr, dg, db, factor) => {
    if (x < 0 || x >= width || y >= height) return;
    const q = (y * width + x) * 3;
    work[q] += dr * factor;
    work[q + 1] += dg * factor;
    work[q + 2] += db * factor;
  };

  // Cuantización con dithering Floyd–Steinberg
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x;
      if (data[p * 4 + 3] < 128) {
        indices[p] = TRANSPARENT;
        continue;
      }
      const r = clamp(work[p * 3]);
      const g = clamp(work[p * 3 + 1]);
      const b = clamp(work[p * 3 + 2]);
      const ri = Math.round(r / 51);
      const gi = Math.round(g / 51);
      const bi = Math.round(b / 51);
      indices[p] = ri * 36 + gi * 6 + bi;

      const er = r - ri * 51;
      const eg = g - gi * 51;
      const eb = b - bi * 51;
      spread(x + 1, y, er, eg, eb, 7 / 16);
      spread(x - 1, y + 1, er, eg, eb, 3 / 16);
      spread(x, y + 1, er, eg, eb, 5 / 16);
      spread(x + 1, y + 1, er, eg, eb, 1 / 16);
    }
  }

  const bytes = [];
  const pushWord = (n) => bytes.push(n & 255, (n >> 8) & 255);

  // Cabecera + pantalla lógica
  'GIF89a'.split('').forEach(c => bytes.push(c.charCodeAt(0)));
  pushWord(width);
  pushWord(height);
  bytes.push(0xF7, 0, 0);

  // Tabla de colores global (256 entradas)
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        bytes.push(r * 51, g * 51, b * 51);
      }
    }
  }
  for (let i = 216; i < 256; i++) bytes.push(0, 0, 0);

  // Extensión de control gráfico (transparencia)
  bytes.push(0x21, 0xF9, 0x04, 0x01, 0, 0, TRANSPARENT, 0);

  // Descriptor de imagen
  bytes.push(0x2C);
  pushWord(0);
  pushWord(0);
  pushWord(width);
  pushWord(height);
  bytes.push(0);

  // Datos comprimidos LZW en sub-bloques de 255 bytes
  const minCodeSize = 8;
  bytes.push(minCodeSize);
  const lzw = lzwEncode(indices, minCodeSize);
  for (let i = 0; i < lzw.length; i += 255) {
    const chunk = lzw.slice(i, i + 255);
    bytes.push(chunk.length);
    for (let j = 0; j < chunk.length; j++) bytes.push(chunk[j]);
  }
  bytes.push(0);

  bytes.push(0x3B);

  return new Blob([new Uint8Array(bytes)], { type: 'image/gif' });
}

function lzwEncode(indices, minCodeSize) {
  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;
  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;
  let dict = new Map();
  const out = [];
  let cur = 0;
  let bits = 0;

  const write = (code) => {
    cur |= code << bits;
    bits += codeSize;
    while (bits >= 8) {
      out.push(cur & 255);
      cur >>= 8;
      bits -= 8;
    }
  };

  write(clearCode);
  let prefix = indices[0];

  for (let i = 1; i < indices.length; i++) {
    const k = indices[i];
    const key = (prefix << 8) | k;
    const found = dict.get(key);

    if (found !== undefined) {
      prefix = found;
      continue;
    }

    write(prefix);

    if (nextCode === 4096) {
      write(clearCode);
      dict = new Map();
      nextCode = eoiCode + 1;
      codeSize = minCodeSize + 1;
    } else {
      if (nextCode >= (1 << codeSize)) codeSize++;
      dict.set(key, nextCode++);
    }
    prefix = k;
  }

  write(prefix);
  write(eoiCode);
  if (bits > 0) out.push(cur & 255);

  return out;
}

// ---------- PDF (una imagen por página, sin librerías) ----------
function encodePDF(jpegBytes, imgW, imgH) {
  const encoder = new TextEncoder();
  const wPt = +(imgW * 0.75).toFixed(2); // 96 px por pulgada -> 72 puntos por pulgada
  const hPt = +(imgH * 0.75).toFixed(2);
  const parts = [];
  const offsets = [];
  let pos = 0;

  const push = (data) => {
    const bytes = typeof data === 'string' ? encoder.encode(data) : data;
    parts.push(bytes);
    pos += bytes.length;
  };

  const object = (n, body) => {
    offsets[n] = pos;
    push(n + ' 0 obj\n' + body + '\nendobj\n');
  };

  push('%PDF-1.4\n');
  push(new Uint8Array([0x25, 0xE2, 0xE3, 0xCF, 0xD3, 0x0A]));

  object(1, '<< /Type /Catalog /Pages 2 0 R >>');
  object(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  object(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + wPt + ' ' + hPt + '] ' +
            '/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');

  offsets[4] = pos;
  push('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + imgW + ' /Height ' + imgH +
       ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + jpegBytes.length +
       ' >>\nstream\n');
  push(jpegBytes);
  push('\nendstream\nendobj\n');

  const content = 'q ' + wPt + ' 0 0 ' + hPt + ' 0 0 cm /Im0 Do Q';
  object(5, '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');

  const xrefPos = pos;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let n = 1; n <= 5; n++) {
    xref += String(offsets[n]).padStart(10, '0') + ' 00000 n \n';
  }
  push(xref);
  push('trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + xrefPos + '\n%%EOF\n');

  return new Blob(parts, { type: 'application/pdf' });
}

// ---------- ZIP (sin compresión, sin librerías) ----------
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) {
    c = crcTable[(c ^ bytes[i]) & 255] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

async function createZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();

  for (const file of files) {
    const data = new Uint8Array(await file.blob.arrayBuffer());
    const name = encoder.encode(file.name);
    const crc = crc32(data);

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // nombres en UTF-8
    local.setUint16(8, 0, true);      // sin compresión
    local.setUint16(10, dosTime, true);
    local.setUint16(12, dosDate, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, name.length, true);
    local.setUint16(28, 0, true);
    chunks.push(new Uint8Array(local.buffer), name, data);

    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x0800, true);
    entry.setUint16(10, 0, true);
    entry.setUint16(12, dosTime, true);
    entry.setUint16(14, dosDate, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, data.length, true);
    entry.setUint32(24, data.length, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(new Uint8Array(entry.buffer), name);

    offset += 30 + name.length + data.length;
  }

  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);

  return new Blob([...chunks, ...central, new Uint8Array(end.buffer)], { type: 'application/zip' });
}

// ==========================================
// RESULTADOS Y UTILIDADES
// ==========================================

function createResultCard(url, filename, thumbUrl) {
  const item = document.createElement('div');
  item.className = 'result-item';

  const thumb = document.createElement('img');
  thumb.className = 'result-thumb';
  thumb.onerror = () => {
    thumb.onerror = null;
    thumb.src = PLACEHOLDER_THUMB;
  };
  thumb.src = thumbUrl || url;

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

function createErrorCard(filename, message) {
  const item = document.createElement('div');
  item.className = 'result-item';

  const info = document.createElement('div');
  info.className = 'result-info';

  const name = document.createElement('div');
  name.className = 'result-filename';
  name.textContent = filename;

  const msg = document.createElement('div');
  msg.textContent = message;
  msg.style.color = '#e5484d';
  msg.style.fontSize = '12px';

  info.appendChild(name);
  info.appendChild(msg);
  item.appendChild(info);

  resultsList.appendChild(item);
}

function getOutputFilename(originalName, newExt) {
  const lastDot = originalName.lastIndexOf('.');
  const baseName = lastDot !== -1 ? originalName.substring(0, lastDot) : originalName;
  return `${baseName}.${newExt}`;
}

// Evita que dos archivos distintos se llamen igual (a.png y a.jpg -> a.webp, a (1).webp)
function uniqueName(name, used) {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf('.');
  const base = dot !== -1 ? name.substring(0, dot) : name;
  const ext = dot !== -1 ? name.substring(dot) : '';
  let n = 1;
  while (used.has(`${base} (${n})${ext}`)) n++;
  const result = `${base} (${n})${ext}`;
  used.add(result);
  return result;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}