import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column()
  is18Plus: boolean;
}

// export type MovieType = {
//   id: number; // id phim
//   type: string; // id loại phim
// }

// //  horor: id: 1, name: 'horror',
// export type Type ={

// }
