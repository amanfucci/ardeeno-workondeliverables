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
    Spec ReqF (UCD) :s0, after am, 15d
    Spec ReqNF :s1, 16-10, 7d
    Diagramma di Contesto :s2, 16-10, 7d
    Diagramma dei Componenti :s3, after s2, 6d
    Documento di Specifica :milestone, sm, 30-10, 0d

    section Progettazione Design
    Class Diagrams :pa0, after sm, 7d
    OCL :pa1, after sm, 7d
    BPMN :pa2, after pa1, 7d
    Documento di Design :milestone, pam, 13-11, 0d

    section Sviluppo e Deployment
    FrontEnd :d0, after pam, 21-11
    BackEnd :d1, after pam, 21-11
    Deployment :d2, after d1, 22-11
    Documento di Sviluppo :milestone, dm, 22-11, 0d

    section Report
    Closing meeting :i0, 21-11, 22-11
    Report Finale :milestone, fm, 22-11, 0d

```

## Tasks List

| **Task**               | **Assigned To(A,E,M)** | **Due To** | **Status** |
|------------------------|------------------------|------------|------------|
|Definizione Obiettivi   |A,E,M|27/09|Done|
|Definizione Requisiti   |A,E|10/10|Done|
|Mock-Up FrontEnd        |A,M|10/10|Done|
|Schema BackEnd          |A|10/10|Done|
|Spec ReqF               |A,E,M|24/10|Active|
|Spec ReqNF              |A|24/10|Done|
|Diagramma di Contesto   |A,E,M|30/10|Active|
|Diagramma dei Componenti||30/10|Active|
|Class Diagrams          ||||
|OCL                     ||||
|BPMN                    ||||
|FrontEnd                ||||
|BackEnd                 ||||
|Deployment              ||||