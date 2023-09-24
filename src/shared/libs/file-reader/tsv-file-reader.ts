import {readFileSync} from 'node:fs';
import {FileReader} from './file-reader.interface.js';
import {Offer, CityList, HousingType, Option, UserType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, date, city, previewImage, images, isPremium, isFavorite, rating, type, rooms, guests, price, options, name, email, avatarPath, password, userType, latitude, longitude]) => ({
        title,
        description,
        date: new Date(date),
        city: city as CityList,
        previewImage,
        images: images.split(';')
          .map((image) => image),
        isPremium: isPremium === 'true',
        isFavorite: isFavorite === 'true',
        rating: Number.parseFloat(rating),
        type: type as HousingType,
        rooms: Number.parseInt(rooms, 10),
        guests: Number.parseInt(guests, 10),
        price: Number.parseInt(price, 10),
        options: options.split(';')
          .map((option) => option) as Option[],
        user: {name, email, avatarPath, password, userType: userType as UserType},
        location: {latitude: Number.parseFloat(latitude), longitude: Number.parseFloat(longitude)},
      }));
  }
}
