import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Проверка отображения содержимого домашней страницы
describe('Home page content', () => {
    test('displays the header', () => {
        render(<App />);
        expect(screen.getByText('Список дел')).toBeInTheDocument();
    });

    test('displays the buttons', () => {
        render(<App />);
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(5); // Создать, Очистить всё, Сделано, Не сделано, Все
        expect(screen.getByText('Создать')).toBeInTheDocument();
        expect(screen.getByText('Очистить всё')).toBeInTheDocument();
    });

    test('displays the input fields', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        expect(input).toBeInTheDocument();
    });
});

// Проверка правильной работы поля ввода
describe('Input field functionality', () => {
    test('adds a task to the list', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        const button = screen.getByText('Создать');
        
        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });
});

// Проверка работы компонента, отображающего список
describe('Task list component', () => {
    test('displays a filled array of tasks with actions', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        const button = screen.getByText('Создать');

        fireEvent.change(input, { target: { value: 'Test Task 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'Test Task 2' } });
        fireEvent.click(button);

        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();

        const completeButtons = screen.getAllByText('✔');
        const removeButtons = screen.getAllByText('×');
        
        expect(completeButtons).toHaveLength(2);
        expect(removeButtons).toHaveLength(2);
    });
});

// Проверка работы кнопок фильтрации и сортировки
describe('Filter and sort buttons functionality', () => {
    test('displays the full set of tasks', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        const button = screen.getByText('Создать');

        fireEvent.change(input, { target: { value: 'Test Task 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'Test Task 2' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'Test Task 3' } });
        fireEvent.click(button);

        expect(screen.getByText('Test Task 1')).toBeInTheDocument();
        expect(screen.getByText('Test Task 2')).toBeInTheDocument();
        expect(screen.getByText('Test Task 3')).toBeInTheDocument();
    });

    test('displays only completed tasks', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        const button = screen.getByText('Создать');

        fireEvent.change(input, { target: { value: 'Test Task 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'Test Task 2' } });
        fireEvent.click(button);
        
        fireEvent.click(screen.getAllByText('✔')[0]);

        const completedFilterButton = screen.getByText('Сделано(1)');
        fireEvent.click(completedFilterButton);

        expect(screen.queryByText('Test Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Test Task 2')).not.toBeInTheDocument();
    });

    test('displays only uncompleted tasks', () => {
        render(<App />);
        const input = screen.getByPlaceholderText('Новый элемент списка');
        const button = screen.getByText('Создать');

        fireEvent.change(input, { target: { value: 'Test Task 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'Test Task 2' } });
        fireEvent.click(button);

        fireEvent.click(screen.getAllByText('✔')[0]);

        const uncompletedFilterButton = screen.getByText('Не сделано(1)');
        fireEvent.click(uncompletedFilterButton);

        expect(screen.queryByText('Test Task 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Task 2')).toBeInTheDocument();
    });
});

