const loadLevel = async (level) => {
    const levelData = await fetch(level);
    return levelData.json();
}

export default loadLevel;