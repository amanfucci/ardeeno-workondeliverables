# Project Plan

## Gantt Diagram

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
    Class Diagrams :active, pa0, after sm, 12d
    OCL :active, pa1, after pa0, 8d
    Documento di Architettura :milestone, pam, 02-12, 0d

    section Sviluppo e Deployment
    FrontEnd :d0, after pam, 21-12
    BackEnd :d1, after pam, 21-12
    Deployment :d2, after d1, 22-12
    Documento di Sviluppo :milestone, dm, 22-12, 0d

    section Report
    Closing meeting :i0, 21-12, 22-12
    Report Finale :milestone, fm, 22-12, 0d

```

## Tasks List

| **Task**               | **Assigned To(A,E,M)** | **Due To** | **Status** |
|------------------------|------------------------|------------|------------|
|Definizione Obiettivi   |A,E,M|27/09|Done|
|Definizione Requisiti   |A,E|10/10|Done|
|Mock-Up FrontEnd        |A,M|10/10|Done|
|Schema BackEnd          |A|10/10|Done|
|Spec ReqF               |A,E,M|24/10|Done|
|Spec ReqNF              |A|24/10|Done|
|Diagramma di Contesto   |A|30/10|Done|
|Diagramma dei Componenti|A,M|9/11|Done|
|Class Diagrams          |A,E|23/11|Active|
|OCL                     |A,E|02/12|Active|
|FrontEnd                ||||
|BackEnd                 ||||
|Deployment              ||||