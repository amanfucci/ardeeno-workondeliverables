# Project Plan

## Gantt Diagram

```mermaid
gantt
    dateFormat DD-MM
    axisFormat %d-%m

    section Analisi dei Requisiti
    Definizione Obiettivi :active, a0, 23-09, 29-09
    Definizione Requisiti :a1, after a0, 05-10
    Mock-Up FrontEnd :a2, after a1, 10-10 
    Schema BackEnd :a3, after a1, 10-10
    Documento di Progetto :milestone, am, 10-10, 0d
    
    section Specifica dei Requisiti
    Spec ReqF (UCD) :s0, after am, 5d
    Spec ReqNF :s1, after am, 5d
    Sequence/Activity Diagrams :s2, after s0, 19-10
    Documento di Specifica :milestone, sm, 19-10, 0d

    section Progettazione Design
    Diagramma di Contesto :pd0, after sm, 4d
    Diagramma dei Componenti :pd1, after pd0, 6d
    BPMN :pd2, after pd1, 07-11
    Documento di Progettazione Design :milestone, pdm, 07-11, 0d

    section Progettazione Architetturale
    Class Diagrams :pa0, after pdm, 10-11
    Specifiche in OCL :pa1, after pa0, 13-11
    Documento di Architettura :milestone, pam, 13-11, 0d

    section Sviluppo e Deployment
    FrontEnd :d0, after pam, 21-11
    BackEnd :d1, after pam, 21-11
    Deployment :d2, after d1, 22-11
    Documento di Sviluppo :milestone, dm, 22-11, 0d

    section Introspezione
    Closing meeting :i0, 21-11, 22-11
    Report Finale :milestone, fm, 22-11, 0d

```

## Tasks List

| **Task**               | **Assigned To(A,E,M)** | **Due To** | **Status** |
|------------------------|------------------------|------------|------------|
|Definizione Obiettivi   |A,E,M|27/09|Active|
|Definizione Requisiti   |A,E|10/10||
|Mock-Up FrontEnd        |E|10/10||
|Schema BackEnd          |M|10/10||
|Spec ReqF               |||||
|Spec ReqNF              |||||
|Sequence Diagrams       |||||
|Diagramma di Contesto   |||||
|Diagramma dei Componenti|||||
|BPMN                    |||||
|Class Diagrams          |||||
|Specifiche in OCL       |||||
|FrontEnd                |||||
|BackEnd                 |||||
|Deployment              |||||