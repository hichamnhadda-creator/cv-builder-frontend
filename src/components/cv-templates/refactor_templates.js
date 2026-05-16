const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'cv-builder-frontend', 'src', 'components', 'cv-templates');

const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(templatesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Ensure useTranslation is imported
    if (!content.includes('useTranslation')) {
        content = "import { useTranslation } from 'react-i18next';\n" + content;
    }

    // 2. Ensure t and i18n are defined
    // Look for the component definition: const TemplateName = ({ data, customization }) => {
    const componentRegex = /const\s+\w+\s*=\s*\(\{\s*data,\s*customization\s*\}\)\s*=>\s*\{/;
    if (componentRegex.test(content)) {
        if (!content.includes('const { t, i18n } = useTranslation();')) {
            content = content.replace(componentRegex, (match) => {
                return `${match}\n    const { t, i18n } = useTranslation();`;
            });
        }
    }

    // 3. Replace hardcoded strings
    content = content.replace(/'Your Name'/g, "t('common.yourName')");
    content = content.replace(/'Your professional name'/g, "t('common.professionalTitle')");
    content = content.replace(/'Professional Title'/g, "t('common.professionalTitle')");
    content = content.replace(/'Summary placeholder\.\.\.'/g, "t('common.summaryPlaceholder')");
    content = content.replace(/>Contact</g, ">{t('editor.sections.personal')}<");

    // 4. RTL Friendly Tailwind classes
    content = content.replace(/\btext-left\b/g, 'text-start');
    content = content.replace(/\btext-right\b/g, 'text-end');
    
    // Margins
    content = content.replace(/\bml-/g, 'ms-');
    content = content.replace(/\bmr-/g, 'me-');
    
    // Padding
    content = content.replace(/\bpl-/g, 'ps-');
    content = content.replace(/\bpr-/g, 'pe-');
    
    // Positioning
    content = content.replace(/\bleft-/g, 'start-');
    content = content.replace(/\bright-/g, 'end-');
    
    // Borders
    content = content.replace(/\bborder-l-/g, 'border-s-');
    content = content.replace(/\bborder-r-/g, 'border-e-');

    // 5. Add dir={i18n.dir()} to the root div
    // We look for the first <div that has a className and add dir there if not present
    if (!content.includes('dir={i18n.dir()}')) {
        content = content.replace(/(<div[^>]*className="[^"]*")/, '$1 dir={i18n.dir()}');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed ${file}`);
});
