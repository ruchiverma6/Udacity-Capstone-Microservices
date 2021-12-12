import {Table, Column, Model, CreatedAt, UpdatedAt} from 'sequelize-typescript';


@Table
export class GratitudeItem extends Model<GratitudeItem> {
  @Column
  public caption!: string;

  @Column
  public url!: string;

  @Column
  @CreatedAt
  public createdAt: Date = new Date();

  @Column
  @UpdatedAt
  public updatedAt: Date = new Date();
}
