


using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ParceirosComerciais.Database;
using ParceirosComerciais.Dtos;
using ParceirosComerciais.Models;

namespace ParceirosComerciais.Services 
{

    public class ParceiroService
    {
        private readonly AppDbContext _db;

        public ParceiroService(AppDbContext db) 
        {
            _db = db;
        }
        
        public async Task<List<Parceiro>> FindAll(string? search)
        {
            var query = _db.Parceiros.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p =>
                    p.CnpjCpf.Contains(search) ||
                    p.RazaoSocial.Contains(search) ||
                    p.NomeFantasia.Contains(search) ||
                    p.Categoria.Contains(search) ||
                    p.Segmento.Contains(search) ||
                    p.Email.Contains(search) ||
                    p.Telefone.Contains(search) ||
                    p.Celular.Contains(search)
                );
            }

            return await query.ToListAsync();
        }

        public async Task Create(CriarParceiroDto data) 
        {
            try 
            {
                await _db.Database.ExecuteSqlRawAsync(@"
                    EXEC sp_inserir_parceiro 
                        @TipoParceiro={0}, @Personalidade={1}, @RazaoSocial={2}, @NomeFantasia={3},
                        @CnpjCpf={4}, @Segmento={5}, @Categoria={6}, @Cep={7}, @Pais={8},
                        @Uf={9}, @Municipio={10}, @Logradouro={11}, @Numero={12}, @Bairro={13},
                        @Email={14}, @Telefone={15}, @Complemento={16}, @Celular={17}, @Observacao={18}",
                    data.TipoParceiro,
                    data.Personalidade,
                    data.RazaoSocial,
                    data.NomeFantasia,
                    data.CnpjCpf,
                    data.Segmento,
                    data.Categoria,
                    data.Cep,
                    data.Pais,
                    data.Uf,
                    data.Municipio,
                    data.Logradouro,
                    data.Numero,
                    data.Bairro,
                    data.Email,
                    data.Telefone,
                    data.Complemento,
                    data.Celular,
                    data.Observacao
                );
            }
            catch (SqlException ex) when (ex.Number == 50000)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }
    }

}