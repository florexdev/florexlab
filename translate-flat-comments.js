const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const getFiles = (dir, ext) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, ext));
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  });
  return results;
};

const jsFiles = getFiles(path.join(rootDir, 'js'), '.js');
const cssFiles = getFiles(path.join(rootDir, 'css'), '.css');
const allFiles = [...jsFiles, ...cssFiles];

const replacements = {
  "text warm retro cream": "metin sicak retro krem",
  "accents mapped to retro palette": "retro palete eslenen vurgular",
  "gradients": "gradyanlar",
  "borders": "kenarliklar",
  "radius slightly crisper for retro feel": "retro hissi icin daha keskin koseler",
  "shadows": "golgeler",
  "spacing": "bosluklar",
  "transitions": "gecisler",
  "z index": "z indeksi",
  "light theme retro warm parchment cream": "acik tema retro sicak parsomem krem",
  "florex lab live kod editörü html css js editor with live preview console output templates": "florex lab canli kod editoru html css js canli onizleme konsol ciktisi sablonlar",
  "state": "durum",
  "default code": "varsayilan kod",
  "templates": "sablonlar",
  "current code state": "guncel kod durumu",
  "console capture": "konsol yakalama",
  "dom references": "dom referanslari",
  "get translated template name": "cevrilmis sablon adini al",
  "build preview html": "onizleme html olustur",
  "run preview": "onizleme calistir",
  "console": "konsol",
  "tab anahtaring": "sekme degistirme",
  "line numbers": "satir numaralari",
  "sync scroll between line numbers and textarea": "satir numaralari ve metin alani arasinda kaydirma senkronizasyonu",
  "load template": "sablon yukle",
  "copy code": "kodu kopyala",
  "download as html": "html olarak indir",
  "clear console": "konsolu temizle",
  "handle tab key in textarea": "metin alaninda sekme tusunu yonet",
  "render the editor section content": "editor bolum icerigini olustur",
  "bind all events": "tum olaylari bagla",
  "resizable panels": "boyutlandirilabilir paneller",
  "init": "baslat",
  "expose": "disari aktar",
  "florex lab komut paleti ctrl k cmd k triggered komut paleti with keyboard navigasyon": "florex lab komut paleti ctrl k cmd k tetiklenen komut paleti klavye yonlendirmeli",
  "command items": "komut ogeleri",
  "open close": "ac kapat",
  "florex lab component gallery renders all 16 custom ui bileşenleri with previews variants and tabbed code html css js": "florex lab bilesen galerisi tum 16 ozel arayuz bilesenini onizlemeler varyantlar ve sekmeli html css js kodu ile olusturur",
  "florex lab deney verileri registry all 24 deneyler with implementations controls and code output": "florex lab deney verileri kaydi tum 24 deney uygulamalar kontroller ve kod ciktisi ile",
  "florex lab deneyler system card grid rendering filtering search viewer with controls and code": "florex lab deneyler sistemi kart izgara olusturma filtreleme arama kontroller ve kod iceren goruntuleyici",
  "card preview generators": "kart onizleme ureticileri",
  "render controls": "kontrolleri olustur",
  "update code output": "kod ciktisini guncelle",
  "florex lab internationalization i18n turkish tr english en language support with instant dynamic translation": "florex lab coklu dil i18n turkce tr ingilizce en dil destegi anlik dinamik ceviri ile",
  "florex lab diyalog modal system accessible diyalog modal with focus trap backdrop click and esc close": "florex lab modal sistemi erisilebilir modal odak tuzagi arkaplan tiklamasi ve esc ile kapatma",
  "florex lab navigasyon navbar scroll behavior hamburger menu routing active states": "florex lab navigasyon navbar kaydirma davranisi hamburger menu yonlendirme aktif durumlar",
  "scroll based navbar styling": "kaydirmaya dayali navbar stili",
  "hamburger toggle": "hamburger ac kapa",
  "routing": "yonlendirme",
  "florex lab oyun alanı tools six interactive css generators with real time preview and copyable output": "florex lab oyun alani araclari gercek zamanli onizleme ve kopyalanabilir cikti ile alti interaktif css uretici",
  "render all tools": "tum araclari olustur",
  "florex lab theme system dark light theme with localstorage persistence and system preference detection": "florex lab tema sistemi yerel depolama kaliciligi ve sistem tercihi algilama ile karanlik aydinlik tema",
  "florex lab bildirim toast notification system stackable bildirim toast notifications with types and auto dismiss": "florex lab bildirim sistemi turleri ve otomatik kapanmasi olan ust uste eklenebilir bildirimler",
  "florex lab utilities shared helper functions used across the application": "florex lab araclar uygulama genelinde kullanilan paylasilan yardimci fonksiyonlar",
  "copy to clipboard": "panoya kopyala",
  "debounce": "geciktirme",
  "throttle": "kisitlama",
  "generate id": "kimlik olustur",
  "escape html": "html kacis",
  "linear interpolation": "dogrusal interpolasyon",
  "clamp": "sinirla",
  "map range": "aralik esle",
  "random integer": "rastgele tamsayi",
  "random float": "rastgele ondalik",
  "hsl to hex": "hsl den hex e",
  "hex to rgb": "hex den rgb ye",
  "hex to hsl": "hex den hsl ye",
  "scroll reveal intersectionobserver": "kaydirma gorunur yap intersectionobserver",
  "create svg icon": "svg ikonu olustur",
  "make scrollbar width available": "kaydirma cubugu genisligini kullanilabilir yap",
  "düzen toggle": "duzen degistir",
  "florex lab live kod editörü html css js editor with live preview console output templates": "florex lab canli kod editoru html css js canli onizleme konsol ciktisi sablonlar",
  "florex lab oyun alanı tools six interactive css generators with real time preview and copyable output": "florex lab oyun alani araclari gercek zamanli onizleme ve kopyalanabilir cikti ile alti interaktif css uretici"
};

const normalizeStr = (s) => s.replace(/[^a-z0-9]/g, '');

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/\/\*([\s\S]*?)\*\//g, (match, p1) => {
    let flat = p1.trim();
    // find exact or very close match
    for (let key in replacements) {
      if (normalizeStr(flat) === normalizeStr(key)) {
        return `/* ${replacements[key]} */`;
      }
    }
    // Try to replace partial english words
    let newFlat = flat;
    for (let key in replacements) {
      if (newFlat.includes(key)) {
         newFlat = newFlat.replace(key, replacements[key]);
      }
    }
    return `/* ${newFlat} */`;
  });

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Comments translated successfully.');
