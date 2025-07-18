/**
 * Extrai os dois primeiros nomes de uma string de nome completo
 * Ignora preposições como "de", "da", "do", "das", "dos"
 * @param {string} nomeCompleto - O nome completo do usuário
 * @returns {string} Os dois primeiros nomes significativos
 */
export function getPrimeirosNomes(nomeCompleto) {
  if (!nomeCompleto || typeof nomeCompleto !== 'string') {
    return '';
  }
  
  // Remove espaços extras e divide por espaços
  const nomes = nomeCompleto.trim().split(/\s+/);
  
  // Lista de preposições para ignorar
  const preposicoes = ['de', 'da', 'do', 'das', 'dos', 'del', 'della', 'dello', 'della', 'degli', 'delle'];
  
  // Filtra as preposições e pega os nomes significativos
  const nomesSignificativos = nomes.filter(nome => 
    !preposicoes.includes(nome.toLowerCase())
  );
  
  // Retorna os dois primeiros nomes significativos
  if (nomesSignificativos.length >= 2) {
    return `${nomesSignificativos[0]} ${nomesSignificativos[1]}`;
  } else if (nomesSignificativos.length === 1) {
    return nomesSignificativos[0];
  }
  
  // Se não houver nomes significativos, retorna os dois primeiros nomes originais
  if (nomes.length >= 2) {
    return `${nomes[0]} ${nomes[1]}`;
  } else if (nomes.length === 1) {
    return nomes[0];
  }
  
  return '';
} 