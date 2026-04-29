import fs from 'fs';
import path from 'path';

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(filePath));
        } else { 
            if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
                results.push(filePath);
            }
        }
    });
    return results;
};

const files = walk('src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('http://localhost:5000')) {
        console.log('Updating API URL in:', file);
        // Replace 'http://localhost:5000' with the dynamic environment variable
        const updatedContent = content.replace(/http:\/\/localhost:5000/g, '${import.meta.env.VITE_API_URL || "http://localhost:5000"}');
        
        // Also need to make sure we use backticks if we inject variables
        // Let's do a safer string replacement:
        // If it's inside a normal string 'http://localhost:5000/api', we can split it:
        // 'http://localhost:5000' + '/api'
        // Actually, the safest way is to replace 'http://localhost:5000' with the variable outside quotes, but that's hard with regex.
        // Since they are mostly used in Axios calls like axios.get('http://localhost:5000/api'),
        // We can replace the whole string.
        
        // Let's replace: 'http://localhost:5000' with (import.meta.env.VITE_API_URL || 'http://localhost:5000')
        // E.g. axios.get('http://localhost:5000/api') -> axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api')
        
        let newContent = content;
        
        // Match 'http://localhost:5000
        const regex1 = /'http:\/\/localhost:5000/g;
        newContent = newContent.replace(regex1, "(import.meta.env.VITE_API_URL || 'http://localhost:5000') + '");
        
        // Match "http://localhost:5000
        const regex2 = /"http:\/\/localhost:5000/g;
        newContent = newContent.replace(regex2, "(import.meta.env.VITE_API_URL || 'http://localhost:5000') + \"");
        
        fs.writeFileSync(file, newContent, 'utf8');
    }
});

console.log('All API URLs updated successfully!');
