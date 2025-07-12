import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        username: string;
        firstName?: string;
        lastName?: string;
    }): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
