export interface Country {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
    official: string;
  };
  latlng: number[];
  cca2: string;
}
