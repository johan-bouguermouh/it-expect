import { HttpException } from '@nestjs/common';
import * as argon from 'argon2';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await argon.hash(this.password);
    } else {
      throw new HttpException('Password is required', 400);
    }
  }
}
