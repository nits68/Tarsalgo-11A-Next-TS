import Megoldas from "@/app/Megoldas";

export default function HomePage() {

  const m: Megoldas = new Megoldas("ajto.txt")

  // 3. feladat: állomány írása:
  m.áthaladásokatÍr("athaladas.txt");

  // 4. feladat
  const inputAzon: number = 22;

  return (
    <div className="font-mono">
      <p>Társalgó feladat megoldása</p>
      <p>2. feladat</p>
      <p>Az első belépő: {m.elsőBelépő}</p>
      <p>Az utolsó kilépő: {m.utolsóKilépő}</p>
      <p>4. feladat</p>
      <p>A végén a társalgóban voltak: {m.társalgóbanMaradt}</p>
      <p>5. feladat</p>
      <p>Például {m.társalgóbanLegtöbben}-kor voltak a legtöbben a társalgóban.</p>
      <p>5. feladat</p>
      <p>Adja meg a személy azonosítóját! {inputAzon}</p>
      {/* HF: 7. feladat megoldása*/}
    </div>
  );
}
