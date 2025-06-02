// dto = data transfer object

export class CreateMovieDto {
  name: string;
  fromDate: Date;
  toDate: Date;
  is18Plus: boolean;
}
