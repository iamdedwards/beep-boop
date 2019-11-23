/* eslint-disable react/prop-types */

import Page from "../partials/page";
import React = require("react");
import { WordMap, getWordMap, Language, Frequency } from "../state/words/wordState";
import { AppState } from "../state/rootReducer";
import { connect } from "react-redux";
import { wordDuck } from "../state/words/wordDuck";

const mapDispatchToProps = { addOrUpdateWord: wordDuck.actions.addOrUpdateWord };

const mapStateToProps = (state: AppState): { wordMap: WordMap } => {
    console.log({state});
    return ({ wordMap: getWordMap(state) });
}

type DashboardProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

interface DashboardState {
    word: string;
    language: Language;
    frequency: Frequency;
    when: string;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
    public state = { 
        word: "",
        language: "English" as Language,
        frequency: 3 as Frequency,
        when : ""
    };
    public render(): React.ReactNode {
        console.log({props: this.props});
        return (
            <Page>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col-5 h-100 border-right border-info p-3">
                            <input className="form-control mb-2" value={this.state.word} onChange={(e): void => {
                                this.setState({word: e.currentTarget.value});
                            }} />
                            <select className="form-control mb-2" onChange={(e): void => {
                                this.setState({language: e.currentTarget.value as Language})
                            }}>
                                <option>English</option>
                                <option>Arabic</option>
                                <option>French</option>
                            </select>
                            <textarea className="form-control mb-2" onChange={(e): void => {
                                this.setState({when: e.currentTarget.value })
                            }}></textarea>
                            <button className="btn btn-primary ml-auto" onClick={(e): void =>{
                                this.props.addOrUpdateWord({ 
                                    word: this.state.word, 
                                    wordDetails: { language: this.state.language, frequency: this.state.frequency, when: this.state.when }})
                            }}>Add</button>
                        </div>
                        <div className="col-5 h-100 border-right border-info p-3">
                            {JSON.stringify(this.props.wordMap)}
                        </div>
                    </div>
                </div>
            </Page>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
