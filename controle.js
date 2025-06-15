    function startSimulation() {
      const Nsoldados = parseInt(document.getElementById('Nsoldados').value);
      const traitorCount = parseInt(document.getElementById('traitorCount').value);
      const ordem = document.getElementById('ordem').value;
      const resultDiv = document.getElementById('result');
      const b1 = document.getElementById('b1');
        console.log(b1)

      if (traitorCount >= Nsoldados / 3) {
        alert("⚠️ Para garantir consenso bizantino, o número de traidores deve ser menor que 1/3 dos nós.");
        return;
      }

      // Começar animação fade-out dos elementos da UI
      document.body.classList.add('hide-ui');
      resultDiv.style.opacity = 0;

      setTimeout(() => {
        resultDiv.innerHTML = '';
        const nodes = [];
        const traitorIndexes = new Set();

        // Definir traidores aleatoriamente
        while (traitorIndexes.size < traitorCount) {
          traitorIndexes.add(Math.floor(Math.random() * Nsoldados));
        }

        for (let i = 0; i < Nsoldados; i++) {
          const isTraitor = traitorIndexes.has(i);
          const decision = isTraitor
            ? (Math.random() > 0.5 ? "ATACAR" : "RECUAR")
            : ordem;
          nodes.push({ id: i + 1, isTraitor, decision });
        }

        // Mostrar nós (opcional, pois vamos esconder a UI)
        // Você pode comentar esse bloco se quiser esconder totalmente as decisões individuais
        /*
        nodes.forEach(node => {
          const div = document.createElement('div');
          div.className = `node ${node.isTraitor ? 'traitor' : 'loyal'}`;
          div.innerHTML = `<strong>Nó ${node.id}</strong><br>${node.isTraitor ? 'Traidor' : 'Leal'}<br>Decisão: ${node.decision}`;
          resultDiv.appendChild(div);
        });
        */

        // Calcular decisão final
        const decisions = {};
        nodes.forEach(node => {
          decisions[node.decision] = (decisions[node.decision] || 0) + 1;
        });
        const finalDecision = decisions.ATACAR > decisions.RECUAR ? "ATACAR" : "RECUAR";

        // Alterar tema de fundo da página
        document.body.classList.remove('theme-attack', 'theme-retreat');
        if (finalDecision === "ATACAR") {
          document.body.classList.add('theme-attack');
        } else {
          document.body.classList.add('theme-retreat');
        }

        // Mostrar resultado destacado
        resultDiv.classList.add('full-result');

        // Texto da decisão final
        const summary = document.createElement('p');
        summary.innerHTML = `<strong>Decisão Final por Maioria: ${finalDecision}</strong>`;
        resultDiv.appendChild(summary);

        // Mostrar imagem grande relacionada
        const img = document.createElement('img');
        img.className = 'result-image';
        if(finalDecision === "ATACAR") {
          img.src = 'https://cdn.pixabay.com/photo/2014/10/02/06/34/war-469503_1280.jpg'; // Ícone de ataque (espada)
          img.alt = 'Imagem de Ataque';
        } else {
          img.src = 'https://www.armyupress.army.mil/portals/7/military-review/Archives/English/JA-22/Herrera/Herrera-fb.jpg'; // Ícone de recuar (seta para trás)
          img.alt = 'Imagem de Recuar';
        }
        resultDiv.appendChild(img);
        console.log("r1")
        // Mostrar resultado com fade-in
        resultDiv.style.opacity = 1;
       
      }, 300);
    }
    function recarregar(){
 location.reload();
    }