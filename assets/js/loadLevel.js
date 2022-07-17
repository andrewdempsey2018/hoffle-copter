const loadLevel = async (level) => {
    const levelData = await fetch('./assets/levels/'+ level + '.json');
    return levelData.json();
}

export default loadLevel;