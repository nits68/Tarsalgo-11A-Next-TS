import Athaladas from "@/app/Athaladas";
import fs from "fs";

export default class Megoldas {
    #áthaladások: Athaladas[] = []

    get elsőBelépő(): number {
        return this.#áthaladások[0].azon;
    }

    get utolsóKilépő(): number {
        for (let i = this.#áthaladások.length - 1; i >= 0; i--) {
            if (this.#áthaladások[i].irány == "ki") {
                return this.#áthaladások[i].azon;
            }
        }
        return -1
    }

    get #statÁthaladás(): Map<number, number> {
        const stat: Map<number, number> = new Map<number, number>();
        for (const e of this.#áthaladások) {
            // if (stat.has(e.azon)) {
            //     const régiÉrték: number = stat.get(e.azon) as number; 
            //     stat.set(e.azon, régiÉrték + 1);
            // } else {
            //     stat.set(e.azon, 1);
            // }
            const régiÉrték: number | undefined = stat.get(e.azon);
            stat.set(e.azon, régiÉrték ?  régiÉrték + 1 : 1);
        }
        return stat;
    }

    get társalgóbanMaradt(): string {
        const vissza: number[] = []
        for (let azon = 0; azon <= 100; azon++) {
            if (this.#statÁthaladás.has(azon) && (this.#statÁthaladás.get(azon) as number) % 2 == 1) {
                vissza.push(azon);
            }
        }
        return vissza.join(" ");
    }

    get társalgóbanLegtöbben(): string {
        let aktLétszám: number = 0;
        let maxLétszám: number = 0;
        let maxIdő: string = "";
        for (const e of this.#áthaladások) {
            if (e.irány == "be") {
                aktLétszám++;
            } else {
                aktLétszám--;
            }
            // Trónfosztás ellenőrzése:
            if (aktLétszám > maxLétszám) {
                maxLétszám = aktLétszám;
                maxIdő = e.idő;
            }
            // console.log(`${e.idő} ${aktLétszám}`)
        }
        return maxIdő;
    }

    constructor(forrás: string) {
        const sorok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (const sor of sorok) {
            const aktSor: string = sor.trim(); // vezérlő karaktereket törli a sor elejéről és végéről
            this.#áthaladások.push(new Athaladas(aktSor))
        }
    }

    áthaladásokatÍr(fileNeve: string): void {
        const ki: string[] = [];
        for (let azon = 1; azon <= 100; azon++) {
            if (this.#statÁthaladás.has(azon)) {
                ki.push(`${azon} ${this.#statÁthaladás.get(azon)}`)
            }
        }
        fs.writeFileSync(fileNeve, ki.join("\r\n")+"\r\n");
    }
}