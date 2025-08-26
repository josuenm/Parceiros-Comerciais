using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class InserirParceiroProcedure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE sp_inserir_parceiro
                    @TipoParceiro INT,
                    @Personalidade INT,
                    @RazaoSocial NVARCHAR(255),
                    @NomeFantasia NVARCHAR(255),
                    @CnpjCpf NVARCHAR(50),
                    @Segmento NVARCHAR(100),
                    @Categoria NVARCHAR(100),
                    @Cep NVARCHAR(20),
                    @Pais NVARCHAR(100),
                    @Uf NVARCHAR(100),
                    @Municipio NVARCHAR(100),
                    @Logradouro NVARCHAR(255),
                    @Numero NVARCHAR(20),
                    @Bairro NVARCHAR(100),
                    @Email NVARCHAR(255),
                    @Telefone NVARCHAR(20),
                    @Complemento NVARCHAR(100),
                    @Celular NVARCHAR(20),
                    @Observacao NVARCHAR(MAX)
                AS
                BEGIN
                    SET NOCOUNT ON;

                    BEGIN TRY

                        IF EXISTS (SELECT 1 FROM Parceiros WHERE CnpjCpf = @CnpjCpf)
                        BEGIN
                            RAISERROR('Parceiro com este CNPJ/CPF já existe.', 16, 1);
                            RETURN;
                        END

                        IF @RazaoSocial IS NULL OR LTRIM(RTRIM(@RazaoSocial)) = ''
                                BEGIN
                            RAISERROR('Razão Social é obrigatória.', 16, 1);
                            RETURN;
                        END

                        IF @CnpjCpf IS NULL OR LTRIM(RTRIM(@CnpjCpf)) = ''
                        BEGIN
                            RAISERROR('CNPJ/CPF é obrigatório.', 16, 1);
                            RETURN;
                        END

                        INSERT INTO Parceiros
                        (
                            TipoParceiro,
                            Personalidade,
                            RazaoSocial,
                            NomeFantasia,
                            CnpjCpf,
                            Segmento,
                            Categoria,
                            Cep,
                            Pais,
                            Uf,
                            Municipio,
                            Logradouro,
                            Numero,
                            Bairro,
                            Email,
                            Telefone,
                            Complemento,
                            Celular,
                            Observacao
                        )
                        VALUES
                        (
                            @TipoParceiro,
                            @Personalidade,
                            @RazaoSocial,
                            @NomeFantasia,
                            @CnpjCpf,
                            @Segmento,
                            @Categoria,
                            @Cep,
                            @Pais,
                            @Uf,
                            @Municipio,
                            @Logradouro,
                            @Numero,
                            @Bairro,
                            @Email,
                            @Telefone,
                            @Complemento,
                            @Celular,
                            @Observacao
                        )
                    END TRY
                    BEGIN CATCH
                        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage, 16, 1);
                    END CATCH
                END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS sp_inserir_parceiro;");
        }
    }
}
