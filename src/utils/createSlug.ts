export function createSlug(name: string, optionalName?: string): string {
     const fullName = optionalName ? `${name} ${optionalName}` : name;
     const slug = fullName
         .toLowerCase()
         .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
         .trim()
         .replace(/\s+/g, '-') // Substitui espaços por hífens
         .replace(/-+/g, '-'); // Remove hífens duplicados
 
     return slug;
 }