# Instruções de Integração da Aplicação "A Epopeia" no Google Sites

Este documento fornece instruções detalhadas para integrar a aplicação educativa sobre Epopeia num site do Google Sites.

## Requisitos Prévios

- Uma conta Google com acesso ao Google Sites
- Os ficheiros da aplicação "A Epopeia" (HTML, CSS, JavaScript e imagens)

## Opção 1: Integração através de HTML Incorporado

O Google Sites permite incorporar código HTML personalizado, o que é ideal para a nossa aplicação.

### Passos para Integração:

1. **Preparar os ficheiros para hospedagem**
   - Comprima todos os ficheiros da aplicação (pasta `epopeia_app`) num ficheiro ZIP
   - Faça upload do ZIP para um serviço de hospedagem como GitHub Pages, Netlify, ou Google Drive

2. **Configurar o Google Sites**
   - Aceda ao Google Sites (sites.google.com)
   - Crie um novo site ou abra um site existente
   - Clique em "Editar" para entrar no modo de edição

3. **Adicionar a aplicação**
   - Clique no botão "Inserir" na barra lateral direita
   - Selecione "Incorporar" > "Incorporar código"
   - No campo de código, cole o seguinte HTML (substitua o URL pelo endereço onde hospedou os ficheiros):

   ```html
   <iframe src="https://seu-endereco-de-hospedagem/index.html" 
           width="100%" 
           height="800px" 
           frameborder="0" 
           allowfullscreen>
   </iframe>
   ```

4. **Ajustar as dimensões**
   - Ajuste a altura (`height`) conforme necessário para que todo o conteúdo seja visível
   - A largura (`width`) pode permanecer em 100% para se adaptar ao tamanho da página

5. **Publicar o site**
   - Clique em "Publicar" no canto superior direito
   - Siga as instruções para publicar ou atualizar o seu site

## Opção 2: Integração Direta dos Ficheiros

Se preferir não utilizar serviços externos de hospedagem, pode incorporar os ficheiros diretamente no Google Sites.

### Passos para Integração:

1. **Preparar os ficheiros**
   - Abra o ficheiro `index.html` e copie todo o seu conteúdo
   - Abra os ficheiros CSS e JavaScript e copie seus conteúdos

2. **Adicionar HTML ao Google Sites**
   - No Google Sites, clique em "Inserir" > "Incorporar código"
   - Cole o conteúdo do ficheiro HTML
   - Clique em "Próximo" e depois em "Inserir"

3. **Adicionar CSS e JavaScript**
   - No código HTML incorporado, substitua as referências externas por código inline:
   - Substitua `<link rel="stylesheet" href="css/styles.css">` por:
     ```html
     <style>
     /* Cole aqui o conteúdo do ficheiro CSS */
     </style>
     ```
   - Substitua `<script src="js/main.js"></script>` por:
     ```html
     <script>
     // Cole aqui o conteúdo do ficheiro JavaScript
     </script>
     ```

4. **Lidar com as imagens**
   - Faça upload das imagens para o Google Drive
   - Torne as imagens públicas (clique com o botão direito > "Partilhar" > "Qualquer pessoa com o link")
   - Substitua os caminhos das imagens no HTML pelos URLs do Google Drive

## Opção 3: Utilizar o Google Drive como Hospedagem

Esta opção permite hospedar todos os ficheiros no Google Drive e incorporar a aplicação no Google Sites.

### Passos para Integração:

1. **Fazer upload dos ficheiros para o Google Drive**
   - Crie uma pasta no Google Drive chamada "Epopeia_App"
   - Faça upload de todos os ficheiros mantendo a estrutura de pastas
   - Clique com o botão direito na pasta > "Partilhar" > "Qualquer pessoa com o link"

2. **Obter o ID da pasta**
   - Abra a pasta no Google Drive
   - O URL terá um formato como: `https://drive.google.com/drive/folders/PASTA_ID`
   - Copie o ID da pasta (a parte após `/folders/`)

3. **Criar um URL para o index.html**
   - O URL para aceder ao index.html será:
   - `https://googledrive.com/host/PASTA_ID/index.html`

4. **Incorporar no Google Sites**
   - No Google Sites, clique em "Inserir" > "Incorporar código"
   - Use o código iframe como na Opção 1, mas com o URL do Google Drive

## Resolução de Problemas Comuns

### As imagens não aparecem
- Verifique se os caminhos das imagens estão corretos
- Confirme que as imagens estão acessíveis publicamente
- Tente usar caminhos absolutos em vez de relativos

### O JavaScript não funciona
- Verifique se não há erros no console do navegador (F12 > Console)
- Confirme que todos os ficheiros JavaScript estão corretamente referenciados
- Alguns navegadores bloqueiam scripts por questões de segurança; verifique as permissões

### Problemas de layout
- Ajuste a altura do iframe para acomodar todo o conteúdo
- Verifique se o CSS está a ser carregado corretamente
- Teste em diferentes navegadores e dispositivos

## Notas Importantes

- A aplicação foi desenvolvida para funcionar sem dependências externas
- Todos os recursos (imagens, scripts, estilos) estão incluídos no pacote
- A aplicação é totalmente responsiva e adapta-se a diferentes tamanhos de ecrã
- O conteúdo está em português europeu, adequado para alunos de 15 anos

Para qualquer dúvida adicional ou suporte, consulte a documentação do Google Sites ou entre em contacto com o desenvolvedor da aplicação.
