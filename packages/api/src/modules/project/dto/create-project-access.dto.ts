import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProjectAccessDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @Min(1)
  roleId: number;
}
