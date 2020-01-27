import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '~/context';
import { SearchBox } from 'office-ui-fabric-react';
import { useDebounce } from 'use-lodash-debounce';
import { getAnswer, sendFeedback, searchDriveItems } from '~/services';
import * as AdaptiveCards from 'adaptivecards';
import qnaCard from '~/cards/qna';
import searchResultCard from '~/cards/searchResult';
import qnaNoResponseCard from '~/cards/qnaNoResponseCard';
import * as ACFabric from 'adaptivecards-fabric';
import * as ACData from 'adaptivecards-templating';

const Search = () => {

    const [searchCriteria, setSearchCriteria] = useState('');
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [cards, setCards] = useState([]);
    const { getSharePointAccessToken, getGraphAccessToken } = useContext(UserContext);
    const debouncedSearchCriteria = useDebounce(searchCriteria, 50);

    useEffect(() => {
        setLoading(true);
        if (debouncedSearchCriteria !== '') {
            Promise.all([returnAnswers(debouncedSearchCriteria), returnSearchResults(debouncedSearchCriteria)]).then((res) => {
                setLoading(true);
                const answers = res[0].answers;
                const searchResults = res[1].value[0].hitsContainers[0].hits;

                if (answers != null) {
                const qnaCards = answers.map(answer => {
                    if (answer.answer == 'No good match found in KB.') {
                        return generateCard(qnaNoResponseCard, answer);
                    } else {
                        return generateCard(qnaCard, answer);
                    }
                });
            }

                const searchCards = searchResults.map(searchResult => {
                    return generateCard(searchResultCard, searchResult._source);
                });
                setCards([...searchCards]);
                setLoading(false);
            });
        }

    }, [debouncedSearchCriteria]);

    const generateCard = (template, app) => {
        const adaptiveCard = new AdaptiveCards.AdaptiveCard();
        ACFabric.useFabricComponents();
        adaptiveCard.hostConfig = new AdaptiveCards.HostConfig({
            fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
        });
        adaptiveCard.onExecuteAction = function (action) {
            if (action.title === 'Submit feedback') {
                return new Promise((resolve, reject) => {
                    getGraphAccessToken()
                        .then(token => {
                            return sendFeedback(token, action._processedData.feedbackText);
                        })
                        .then((res) => {
                            setSearchCriteria('');
                            return resolve(res.data);
                        }, err => {
                            console.error(err);
                        });
                })
            } else {
                window.location.href = action.url;
            }
        };
        const acTemplate = new ACData.Template(template);
        const dataContext = new ACData.EvaluationContext();
        dataContext.$root = app;
        const card = acTemplate.expand(dataContext);
        adaptiveCard.parse(card);
        return adaptiveCard.render();
    }

    const returnAnswers = (value) => {
        return new Promise((resolve, reject) => {
            //getAnswer(value)
            //    .then((res) => resolve(res.data), err => console.error(err));
            resolve('');
        })
    }

    const returnSearchResults = (value) => {
        return new Promise((resolve, reject) => {
            getGraphAccessToken()
                .then(token => {
                    searchDriveItems(token, value)
                        .then((res) => {
                            return resolve(res.data);
                        }, err => {
                            console.error(err);
                            return;
                        });
                    })
        })
    }

    return (
        <>
            <SearchBox
                placeholder='Ask your question here...'
                styles={{ root: { height: 60, fontSize: '32px' } }}
                onChange={(_event, newValue) => setSearchCriteria(newValue)}
                iconProps={{ iconName: 'Search', className: 'searchIcon' }}
                autocomplete="off"
            />
            {!loading &&
                <div style={{
                    backgroundColor: '#e9ecef',
                    padding: '10px',
                    position: 'absolute',
                    zIndex: 9999,
                    width: '1088px'
                }}>
                    {loading && <Spinner size={SpinnerSize.large} />}
                    {!loading &&
                        <div>
                            {cards.map((card, i) => {
                                // Return the element. Also pass key
                                return <div key={'appDiv' + i} className="card ms-depth-16"
                                    style={{
                                        margin: '10px',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minWidth: '0',
                                        wordWrap: 'break-word',
                                        backgroundColor: '#fff',
                                        backgroundClip: 'border-box',
                                        border: '1px solid rgba(0,0,0,.125)',
                                        borderRadius: '.25rem'
                                    }} ref={(n) => { n && n.appendChild(card) }} />
                            })}
                        </div>
                    }
                </div>
            }
            <style jsx>{`
                .searchIcon {
                    font-size: 32px;
                }
            `}
            </style>
        </>

    )
}

export default Search