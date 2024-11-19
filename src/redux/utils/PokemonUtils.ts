import { Pokemon } from "../types/Pokemon";
import { PokemonTypes } from "../types/PokemonTypes";

const urlImagePokemon:string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

export class PokemonUtils {
    
    public static getPokemonsTransform(pokemonsData: any[], offset: number): Pokemon[] {

      const pokemonsRes: Pokemon[] = pokemonsData.map((pokemon: any, index:number) => ({
          id: offset + index + 1,
          name: PokemonUtils.capitalize(pokemon.name),
          number:  PokemonUtils.formatNumber(offset, index),
          url:pokemon.url,
          urlImage:`${urlImagePokemon}/${offset + index + 1}.png`
        }) 
      );

      return pokemonsRes
          
    }

    public static async getPokemonsTypeTransform(pokemonsDataTypes:any) { 
      
        const types: PokemonTypes[] = pokemonsDataTypes.map((typeInfo: any) => ({
          type: typeInfo.type.name,
          name: PokemonUtils.capitalize(typeInfo.type.name),
          typeImg: `/icon/${typeInfo.type.name}.svg`,
          classPokemonType: `pokemon-type pokemonType-${typeInfo.type.name}`
        }))

        return types;
    }

    public static formatNumber(offset:number, index:number){
      return `#${String(offset + index + 1).padStart(3, '0')}`
    }

    // Método para capitalizar la primera letra de una cadena
    public static capitalize(text: string): string {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    
  }
  