export const usePokeAPI = () => {
  const urlBase = "https://pokebuildapi.fr/api/v1/pokemon/";

  async function getPokemons() {
    try {
      const response = await fetch(urlBase + "limit/100");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des Pokémon", error);
      return [];
    }
  }

  async function getTypes() {
    try {
      const response = await fetch("https://pokebuildapi.fr/api/v1/types");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Erreur lors du chargement des types", error);
      return [];
    }
  }

  async function getPokeDetails(pokeId: string) {
    try {
      const response = await fetch(urlBase + pokeId);
      const data = await response.json();
      return data
    } catch (error) {
      console.error("Erreur lors du chargement des détails du Pokémon", error);
      return [];
    }
  }

  return { getPokemons, getTypes, getPokeDetails };
};
