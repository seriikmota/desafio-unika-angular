import { CpfOrCnpjPipe } from './cpf-or-cnpj.pipe';

describe('CpfOrCnpjPipe', () => {
  it('create an instance', () => {
    const pipe = new CpfOrCnpjPipe();
    expect(pipe).toBeTruthy();
  });
});
