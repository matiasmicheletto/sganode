import React, { useState, useContext } from 'react';
import { Card, ListGroup,  Button, Row, Col } from 'react-bootstrap';
import GAItem from '../gaitem';
import { FaPlus, FaTimes } from 'react-icons/fa';
import classes from './styles.module.css';
import { OMContext } from '../../context/ManagerContext';

const FitnessItem = props => {

    const om = useContext(OMContext);
    const [ga_list, setGAList] = useState(om.ga);

    const add_ga = fitness_id => {
        om.add_ga(fitness_id);
        setGAList([...om.ga]);
    };

    const remove_ga = ga_id => {
        om.remove_ga(ga_id);        
        setGAList([...om.ga]);        
    }

    return (
        <Card className={classes.FitnessCard}>
            <Card.Title className="p-2">
                <Row>
                    <Col>
                        <h4>{props.fitness.name}</h4>
                    </Col>
                    <Col align="right">
                        <Button 
                            variant="flat"
                            onClick={()=>{props.remove(props.fitness.id)}}
                            title="Remove Fitness">
                            <FaTimes />
                        </Button>
                    </Col>
                </Row>
            </Card.Title>
            <Card.Body>
                <Row>
                    <ListGroup className={classes.GAList}>
                    {    
                        ga_list.length > 0 ?
                            ga_list.map( (ga, ind) => (
                                (ga.fitness_id === props.fitness.id )
                                && 
                                <GAItem key={ind} ga={ga} remove={remove_ga}/>
                            ))
                        :
                            <center><h4>No optimizers added yet</h4></center>
                    }
                    </ListGroup>
                </Row>
                <Row>
                    <Col sm={{span: 1, offset:11}} align="right">
                        <Button 
                            className={[classes.BtnRnd, classes.AddGABtn]} 
                            onClick={()=>add_ga(props.fitness.id)}
                            title="Add Optimizer">
                            <FaPlus />
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}
    
export default FitnessItem;