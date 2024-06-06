import React, { useState } from 'react';
import { useTheme } from '../ThemeContext/ThemeContext';
import themeCircleButton from '../../theme-circle-button.png';
import defaultThemeButton from '../../theme-button-image-default.png';
import darkCaveThemeButton from '../../theme-button-image-default-2.png';
import swampThemeButton from '../../theme-button-image-default-3.png';
import bloodTundraThemeButton from './/theme-button-blood-tundra.png';
import palaceThemeButton from './/theme-button-palace.png';
import fifthCircleThemeButton from './/theme-button-fifth-circle.png';
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
    const { switchTheme } = useTheme();
    const [isThemeOptionsVisible, setIsThemeOptionsVisible] = useState(false);

    const toggleThemeOptions = () => {
        setIsThemeOptionsVisible(!isThemeOptionsVisible);
    };

    const handleThemeChange = (theme) => {
        switchTheme(theme);
        setIsThemeOptionsVisible(false);
    };

    return (
        <div className="theme-switcher-container">
            <img
                src={themeCircleButton}
                alt="Theme Button"
                onClick={toggleThemeOptions}
                className="theme-circle-button"
            />
            {isThemeOptionsVisible && (
                <div className="theme-options">
                    <img
                        src={defaultThemeButton}
                        alt="Default Theme"
                        onClick={() => handleThemeChange('default')}
                        className="theme-option-button"
                    />
                    <img
                        src={darkCaveThemeButton}
                        alt="Dark Cave Theme"
                        onClick={() => handleThemeChange('darkCave')}
                        className="theme-option-button"
                    />
                    <img
                        src={swampThemeButton}
                        alt="Swamp Theme"
                        onClick={() => handleThemeChange('swamp')}
                        className="theme-option-button"
                    />
                    <img
                        src={bloodTundraThemeButton}
                        alt="Blood Tundra Theme"
                        onClick={() => handleThemeChange('bloodTundra')}
                        className="theme-option-button"
                    />
                    <img
                        src={palaceThemeButton}
                        alt="Palace Theme"
                        onClick={() => handleThemeChange('palace')}
                        className="theme-option-button"
                    />
                    <img
                        src={fifthCircleThemeButton}
                        alt="Fifth Circle Theme"
                        onClick={() => handleThemeChange('fifthCircle')}
                        className="theme-option-button"
                    />
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;
