import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Icon, Dialog, DialogType } from 'office-ui-fabric-react';
import { useState, useEffect } from 'react';
import { relative } from 'path';

const News = ({ data, elementPrefix, hideArrows, wheel }) => {

    const [selected, setSelected] = useState(0);
    const [menuItems, setMenuItems] = useState([]);
    const ArrowLeft = Arrow({ icon: 'ChevronLeft', elementPrefix: elementPrefix });
    const ArrowRight = Arrow({ icon: 'ChevronRight', elementPrefix: elementPrefix });
    const ArrowHidden = Arrow({ icon: '', elementPrefix: elementPrefix })


    const onSelect = (key) => {
        setSelected({ selected: key });
    }

    useEffect(() => {
        setMenuItems(Menu(data, elementPrefix));
    }, [])

    return (
        <>
            <ScrollMenu
                alignCenter={false}
                data={menuItems}
                arrowLeft={hideArrows ? ArrowHidden : ArrowLeft}
                arrowRight={hideArrows ? ArrowHidden : ArrowRight}
                selected={selected}
                onSelect={onSelect}
                wheel={wheel}
            />
            <style global jsx>{`
                .menu-item {
                    padding: 0 40px;
                    margin: 5px 10px;
                    user-select: none;
                    cursor: pointer;
                    border: none;
                }
                .menu-item-wrapper {
                    border: none;
                    outline-style:none;
                  }
                  .menu-item.active {
                    border: none;
                  }
                .arrow-hidden {
                    visibility: hidden;
                }
                .roundCorners {
                    border-radius: 15%;
                    border: 2px solid black;
                    margin: 10px;
                }
            `}</style>
        </>
    )
}

const MenuItem = ({ link, newsTitle, imgAlt, key, description, elementPrefix }) => {
    const [dialogHidden, setDialogVisible] = useState(true);
    const toggleDialog = () => {
        let visible = dialogHidden;
        if (visible) {
            visible = false;
        } else {
            visible = true;
        }
        setDialogVisible(visible);
    }


    const parentImage = { position: relative};
    const infoSection = {
        position: 'absolute',
        top: '20px',
        left: '190px',
        width: '100%',
        height: '100%'
    };
    const infoIcon = {
        fontSize: 'x-large',
        color: 'black',
        cursor: 'pointer'
    };
    const callout = {
        maxWidth: 300
    }
    
    const _menuButtonElement = React.createRef();
    
    return (
        <div key={key} className={'ms-Grid-col ms-sm12'} style={parentImage}>
            <a href={link} target="_blank" rel="noopener noreferrer" >
                <img id={'img' + elementPrefix + newsTitle} src={newsTitle + '600.png'} alt={imgAlt} className='roundCorners' style={{ height: '200px' }} />
                </a>
                <div style={infoSection} ref={_menuButtonElement} onClick={toggleDialog}>
                    <Icon id={'info' + elementPrefix + newsTitle} iconName="Info" className="ms-IconExample" style={infoIcon}/>       
                </div>
                
                <Dialog
                hidden={dialogHidden}
                onDismiss={toggleDialog}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: imgAlt,
                  closeButtonAriaLabel: 'Close',
                  subText: description
                }}
                modalProps={{
                  isBlocking: false,
                  styles: { main: { maxWidth: 450 } }
                }}
              >
              </Dialog>
                
        </div>
    );
};

const Menu = (list, elementPrefix) =>
    list.map((news, i) => {
        return <MenuItem
            link={news.AbsoluteUrl}
            newsTitle={`${replaceSpaces(news.Title)}`}
            imgAlt={news.Title}
            key={i}
            description={news.Description}
            elementPrefix={elementPrefix}
        />
    });

const Arrow = ({ icon, elementPrefix }) => {
    const className = icon ? '' : 'arrow-hidden';
    const styles = icon ? { cursor: 'pointer', padding: '20px', zIndex: 300 } : { padding: '20px' };
    return (
        <div className={className} style={styles}>
            <Icon id={elementPrefix + icon} iconName={icon} className={'ms-IconExample'} style={{ fontSize: '40px', color: 'white' }} />
        </div>
    );
};


function replaceSpaces(imagePath) {
    imagePath = imagePath.replace(' ','');
    imagePath = imagePath.replace('%20','');
    return imagePath;
}

function onDialogDismiss() {
    ;
}
export default News;