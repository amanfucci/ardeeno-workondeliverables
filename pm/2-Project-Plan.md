# Project Plan

### Gantt Diagram

```mermaid
gantt
    dateFormat DD-MM
    axisFormat %d-%m

    section Analisi dei Requisiti
    Definizione Obiettivi :done, a0, 23-09, 29-09
    Definizione Requisiti :done,a1, after a0, 05-10
    Mock-Up FrontEnd :done,a2, after a1, 10-10 
    Schema BackEnd :done,a3, after a1, 10-10
    Documento di Progetto :done,milestone, am, 10-10, 0d
    
    section Specifica dei Requisiti
    Spec ReqF (UCD) :done,s0, after am, 12d
    Spec ReqNF :done,s1, after s0, 4d
    Diagramma di Contesto :done,s2, after s1, 5d
    Diagramma dei Componenti :done, s3, after s2, 10d
    Documento di Specifica :done, milestone, sm, 09-11, 0d

    section Progettazione Architettura
    Class Diagrams :done, pa0, after sm, 12d
    OCL :done, pa1, after pa0, 8d
    Documento di Architettura :done, milestone, pam, 02-12, 0d

    section Sviluppo e Deployment

    User Flows :active, d0, after pam, 12-12
    Resources Extraction :active, d1, after pam, 12-12
    Resources Models :d2, after d1, 2d
    Sviluppo BackEnd :d3, after d2, 2d
    Sviluppo FrontEnd :d4, after d0, 22-12
    Deployment :d5, after d0, 22-12
    Testing :d6, after d0, 22-12
    Documento di Sviluppo :milestone, dm, 22-12, 0d

    section Report
    Closing meeting :i0, 12-12, 1d
    Report Finale :milestone, fm, 22-12, 0d
```

### Tasks List

|**Deliverable**|**Task**|**Assignees**|**Due**|**Status**|
|---------|---------|-----|---|---|
|Documento di Progetto       |Definizione Obiettivi   |A,E,M|27/09|Done|
|                            |Definizione Requisiti   |A,E|10/10|Done|
|                            |Mock-Up FrontEnd        |A,M|10/10|Done|
|                            |Schema BackEnd          |A|10/10|Done|
|Documento di Specifica      |Spec ReqF               |A,E,M|24/10|Done|
|                            |Spec ReqNF              |A|24/10|Done|
|                            |Diagramma di Contesto   |A|30/10|Done|
|                            |Diagramma dei Componenti|A,M|9/11|Done|
|Documento di Architettura   |Class Diagrams          |A,E|23/11|Done|
|                            |OCL                     |A|02/12|Done|
|Documento di Sviluppo       |User Flows              |A,M|12/12|Active|
|                            |Resources Extraction    |A|12/12|Active|
|                            |Resources Models        |A|14/12|Active|
|                            |Sviluppo BackEnd        |A,E,M|16/12|Active|
|                            |Sviluppo FrontEnd       |A|22/12|Active|
|                            |Deployment              |A|22/12|Active|
|                            |Testing                 |A,E,M|22/12|Active|