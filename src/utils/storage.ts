/**
 * Acesso ao localStorage tolerante a falhas: em modo privado, com cookies
 * bloqueados ou com a quota esgotada o acesso lança exceção. As falhas são
 * registradas em vez de derrubarem a aplicação.
 */
export const readStorage = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    console.warn(`Não foi possível ler "${key}" do localStorage:`, error);
    return null;
  }
};

export const writeStorage = (key: string, value: string): boolean => {
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Não foi possível salvar "${key}" no localStorage:`, error);
    return false;
  }
};
