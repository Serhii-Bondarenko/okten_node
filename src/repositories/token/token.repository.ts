import { EntityRepository, getManager, Repository } from 'typeorm';
import { IToken, Token } from '../../entity/token';
import { ITokenRepository } from './token.repository.interface';
import { ITokenDataToSave } from '../../interfaces/token.interface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(token: ITokenDataToSave): Promise<IToken> {
        return getManager().getRepository(Token).save(token);
    }

    public async findTokenByUserId(userId: number): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne({ userId });
    }

    public async deleteByParams(findObj: Partial<IToken>): Promise<any> {
        return getManager().getRepository(Token).delete(findObj);
    }
}

export const tokenRepository = new TokenRepository();
