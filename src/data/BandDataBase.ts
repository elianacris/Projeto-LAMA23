import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {
    private static TABLE_NAME = "NOME_TABELA_BANDAS";

    public async createBand(band: Band): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: band.getId,
                    name: band.getName,
                    music_genre: band.getMusicGenre,
                    responsible: band.getResponsible
                })
                .into(BandDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getBandById(id:string): Promise <Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({id});

    return Band.toBandModel(result[0])
    }
}