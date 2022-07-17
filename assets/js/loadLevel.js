const loadLevel = async (level) => {
    const levelData = await fetch('./assets/levels/'+ testlev + '.json');
    return levelData.json();
}

export default loadLevel;