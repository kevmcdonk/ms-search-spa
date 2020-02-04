import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Icon, Dialog, DialogType } from 'office-ui-fabric-react';
import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib-commonjs/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib-commonjs/Image';
import { useState, useEffect } from 'react';
import newsResultCard from '~/cards/newsResult';
import { relative } from 'path';
import { CardElement } from 'adaptivecards';
import * as AdaptiveCards from 'adaptivecards';
import * as ACFabric from 'adaptivecards-fabric';
import * as ACData from 'adaptivecards-templating';

const News = ({ data, elementPrefix, hideArrows, wheel }) => {

    const [searchCriteria, setSearchCriteria] = useState('');
    const [loading, setLoading] = useState(false);
    const [newsResults, setNewsResults] = useState([]);
    const [cards, setCards] = useState([]);

    const onSelect = (key) => {
        setSelected({ selected: key });
    }

    useEffect(() => {
        setLoading(true);
        const newsCards = data.map(newsResult => {
            return generateCard(newsResultCard, newsResult);
        });
        setCards([...newsCards]);
    }, [])

    return (


        <>
            <div className="ms-Grid" style={{
                backgroundColor: '#e9ecef',
                padding: '10px',
                position: 'absolute',
                zIndex: 4444,
                width: '1088px'
            }}>
               
                    <div className="ms-Grid-row">
                        {cards.map((card, i) => {
                            // Return the element. Also pass key
                            return <div className="ms-Grid-col ms-sm6 ms-md4 ms-lg3">
                            <div key={'appDiv' + i} 
                                className="card ms-depth-16"
                                style={{
                                    margin: '5px',
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
                            </div>
                        })}
                    </div>
            </div>
        </>
    )
}


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

function replaceSpaces(imagePath) {
    if (imagePath && imagePath != undefined && imagePath != null && imagePath != '') {
        imagePath = imagePath.replace(' ', '');
        imagePath = imagePath.replace('%20', '');
        return imagePath;
    }
    return '';
}

function onDialogDismiss() {
    ;
}
export default News;