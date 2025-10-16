export interface Review {
  id: number;
  user: string;
  initials: string;
  date: string;
  text: string;
}

export const mockReviews: Review[] = [
  {
    id: 1,
    user: "Mateo Lorenzo",
    initials: "ML",
    date: "14 Octubre 11:28hs",
    text: "La primera vez que compré me vino una M que me quedaba muy ajustada, la devolví y me trajeron una L que me quedó perfecto. Buena calidad.",
  },
  {
    id: 2,
    user: "Marcos Loero",
    initials: "ML",
    date: "13 Octubre 10:52hs",
    text: "Le doy 4 estrellas porque tenía una marca pero no afecta la funcionalidad. No es para temperaturas menores a 10 grados, en Neuquén capital a -2 grados sentí frío incluso con cubremuñecas.",
  },
  {
    id: 3,
    user: "Lucas Villar",
    initials: "LV",
    date: "12 Octubre 19:10hs",
    text: "Excelente producto, muy cómodo y funcional. Lo recomiendo totalmente.",
  },
  {
    id: 4,
    user: "Juan Cabrera",
    initials: "JC",
    date: "11 Octubre 03:16hs",
    text: "Tuve un accidente y el guante protegió mi mano, no se rompió y absorbió el impacto. No uso mucho la función táctil pero funciona bien.",
  },
  {
    id: 5,
    user: "Mateo Lorenzo",
    initials: "ML",
    date: "10 Octubre 20:30hs",
    text: "Sugiero que especifiquen si incluye alforja para motociclistas donde guardar el candado.",
  },
  {
    id: 6,
    user: "Mateo Lorenzo",
    initials: "ML",
    date: "10 Octubre 20:30hs",
    text: "Cumple perfectamente con su función, buen precio comparado con otras marcas.",
  },
];
