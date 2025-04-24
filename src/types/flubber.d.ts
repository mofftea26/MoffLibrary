declare module "flubber" {
  export function interpolate(
    fromPath: string,
    toPath: string
  ): (t: number) => string;
}
