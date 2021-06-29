import React, { useState, useContext } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import FitnessSelect from '../fitnessselect';
import FitnessItem from '../fitnessitem';
import classes from './styles.module.css';
import { ExperimentCtx } from '../../context/ExperimentCtx';

/*
    Configurator Component
    ----------------------
    This component renders the "Experiment configuration" section.
    It also provides the rendering of the fitness item list,
    the fitness type selector, and manages the adding and removing
    fitness models from the experiment.
    The fitness configuration is handled in the FitnessItem
    component.
*/ 

const Configurator = () => {

    const experiment = useContext(ExperimentCtx);
    const [f_type, setFType] = useState(experiment.constructor.fitness_types.Quadratic);
    const [fitness_list, setFitnessList] = useState(experiment.fitness_list);

    const add_fitness = () => {
        experiment.reset();
        experiment.add_fitness(f_type);
        setFitnessList([...experiment.fitness_list]);
    };

    const remove_fitness = id => {
        experiment.reset();
        experiment.remove_fitness(id);
        setFitnessList([...experiment.fitness_list]);
    };

    const fitnessSelection = type => { // Fitness select callback
        setFType(type);
    };

    return (
        <div className={classes.Container}>
            <h4>Experiment configuration</h4>
            <Row style={{margin:"0px"}}>
            {
                fitness_list.length > 0 ?
                    fitness_list.map( f => <FitnessItem key={f.id} fitness={f} remove={remove_fitness}/> )
                :
                    <center style={{margin:"50px 0px 50px 0px"}}><h4>No objective functions added yet</h4></center>
            }
            </Row>
            <Row>
                <Col xs={{span:8, offset:3}} md={{span:6, offset:5}} lg={{span:3, offset:8}} className={classes.FitnessSelectContainer}>
                    <FitnessSelect value={f_type} onChange={fitnessSelection} />
                </Col>
                <Col xs="1" align="right">
                    <Button 
                        variant="success"
                        className={[classes.BtnRnd, classes.AddFitnessBtn]} 
                        onClick={add_fitness}
                        title="Add Fitness Function">
                        <FaPlus />
                    </Button>                    
                </Col>
            </Row>
        </div>
    );
}

export default Configurator;