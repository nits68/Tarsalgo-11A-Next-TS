import Athaladas from "@/app/Athaladas";
import fs from "fs";

export default class Megoldas {
    #áthaladások: Athaladas[] = []

    get elsőBelépő(): number {
        return this.#áthaladások[0].azon;
    }

    get utolsóKilépő(): number {
        for (const e of this.#áthaladások.reverse()) {
            if (e.irány == "ki") return e.azon;
        }
        return -1; // Csak akkor -1, ha nincs kilépő a társalgóból
    }

    get statÁthaladás(): Map<number, number> {
        const stat: Map<number, number> = new Map<number, number>();
        for (const e of this.#áthaladások) {
            if (stat.has(e.azon)) {
                const régiÉrték: number = stat.get(e.azon) as number; 
                stat.set(e.azon, régiÉrték + 1);
            } else {
                stat.set(e.azon, 1);
            }
        }
        return stat;
    }

    constructor(forrás: string) {
        const sorok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (const sor of sorok) {
            const aktSor: string = sor.trim(); // vezérlő karaktereket törli a sor elejéről és végéről
            this.#áthaladások.push(new Athaladas(aktSor))
        }
    }
}