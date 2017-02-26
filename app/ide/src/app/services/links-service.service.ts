import { Injectable } from '@angular/core';

@Injectable()
export class LinksServiceService {

  constructor() { }
  startLinks: link[] =[
    {title: "New file",url: "http://ide:4200/new",icon: "sdas" , subtitle: "Creat a new script file"},
    {title: "Open file",url: "http://ide:4200/open",icon: "sdas" , subtitle: "Open an existing script"},
    {title: "Open shell",url: "http://shell:4200/open",icon: "sdas" , subtitle: "Open new REPL in shell"}
  ]

  recentLinks: link[] =[
    {title: "sdas",url: "sdas",icon: "sdas" , subtitle: "ds"}
  ]

  webLinks: link[] =[
    {title: "Ask a question", url: "http://link:4200/stackoverflow.com/",icon: "sdas", subtitle: "Ask a question about Easybasic online"},
    {title: "View web", url: "http://link:4200/naumanumer.github.io/easybasic",icon: "sdas", subtitle: "See our website and blog"},
    {title: "View Github repository", url: "http://link:4200/github.com/naumanumer/easybasic",icon: "sdas", subtitle: "See Easybasic code and contribute using Github"},
    {title: "View Facebook page", url: "http://link:4200/fb.com/easybasicide",icon: "sdas", subtitle: "Like us on Facebook and stay connected to us"},
  ]

  quickLinks: link[] =[
    {title: "Open Easybasic IDE",url: "http://ide:4200/",icon: "sdas", subtitle: "Open Easybasic IDE to create, edit and run BASIC scripts"},
    {title: "Open Easybasic shell",url: "http://shell:4200/",icon: "sdas", subtitle: "Create a new REPL session using Easybasic shell"},
    {title: "Open Easybasic help",url: "http://help:4200/",icon: "sdas", subtitle: "See full language documentation, other FAQs or ask your own one online"},
    {title: "Report an Issue",url: "http://help:4200/issue/",icon: "sdas", subtitle: "If you found any bug or issue report us to be fixed"},
    {title: "Request a feature",url: "http://help:4200/feature/",icon: "sdas", subtitle: "Something missing? Tell us"},
    {title: "Credits",url: "http://help:4200/Credits/",icon: "sdas", subtitle: "See who made me beside author"},
    {title: "About author",url: "http://help:4200/author/",icon: "sdas", subtitle: "See who created me."}
  ]
}

export class link{
  title: string;
  url: string;
  icon: string;
  subtitle: string;
}