import React from "react";

export default class About extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section className="about-section block-center">
                <header className="about-header block-center">O programie</header>
                <div className="purpose-desc block-center">Program wykonany na zaliczenie projektu końcoworocznego w XVIII liceum Ogólnokształcącym im. Jana Zamoyskiego w Warszawie.</div>
                <div className="repo-adress">Github Repo: <a className = "github-link" href = "https://github.com/SKupisz/triangle-analysis">triangle-analysis</a></div>
                <footer className="repo-adress author-data">Szymon Kupisz 2021®</footer>
            </section>
        )
    }
}