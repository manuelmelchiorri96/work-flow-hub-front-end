# Progetto Finale Frontend: Work_Flow_Hub

Questo è il frontend del progetto finale per start2impact, che fornisce un'interfaccia utente per interagire con il backend attraverso un'interfaccia web.

## Funzionalità dell'applicazione

1. **Project Manager:**
   - *Inserimento Progetti*: Il project manager può inserire nuovi progetti nell'applicazione.
   - *Assegnazione Task*: Il project manager può assegnare task ai dipendenti all'interno di un progetto specifico.
   - *Visualizzazione Dipendenti*: Il project manager può visualizzare l'elenco dei dipendenti e le loro informazioni.
   - *Visualizzazione Stato Task*: Il project manager può visualizzare lo stato dei task assegnati all'interno dei progetti.

2. **Dipendente:**
   - *Visualizzazione Propri Task*: Il dipendente può visualizzare i task assegnati a lui/lei.
   - *Modifica Stato Task*: Il dipendente può modificare lo stato dei task assegnati a lui/lei, ad esempio da "10%" a "20%".

Queste funzionalità consentono ai project manager e ai dipendenti di gestire in modo efficiente i progetti e i task all'interno dell'applicazione.

## Tecnologie utilizzate

- Angular
- HTML
- CSS
- TypeScript
- Bootstrap

## Requisiti

- Node.js e npm installati
- Angular CLI (Command Line Interface)

## Configurazione

1. Clonare il repository:

```bash
git clone https://github.com/manuelmelchiorri96/work-flow-hub-front-end.git
```

2. Navigare nella directory del progetto:

```bash
cd work-flow-hub-front-end
```

3. Installare le dipendenze:

```bash
npm install
```

4. Cambiare la stringa nel service **(opzionale)**:

- **IntelliJ**

  ```typescript
  private baseUrl: string =
      'http://localhost:8080/work-flow-hub-back-end-0.0.1-SNAPSHOT/api/work-flow-hub';
   ```

- **Eclipse**

   ```typescript
  private baseUrl: string =
    'http://localhost:8080/work-flow-hub-back-end/api/work-flow-hub';
   ```

5. Avviare il server di sviluppo:

```bash
ng serve
```

6. Aprire il browser e andare all'indirizzo `http://localhost:4200/` per visualizzare l'applicazione.

## Struttura del progetto

Il progetto è organizzato nei seguenti componenti:

- `src/app/components`: Contiene i componenti Angular che definiscono le varie parti dell'interfaccia utente.
- `src/app/services`: Contiene i servizi Angular che gestiscono le chiamate API al backend.
- `src/app/models`: Contiene le classi TypeScript che rappresentano i dati utilizzati dall'applicazione.
- `src/assets`: Contiene risorse statiche come immagini, fogli di stile e altri file utilizzati nell'applicazione.

## Licenza

Questo progetto è rilasciato sotto la licenza [MIT](LICENSE.txt).
