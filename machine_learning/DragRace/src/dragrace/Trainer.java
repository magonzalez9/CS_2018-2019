/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dragrace;

import javax.swing.ImageIcon;

/**
 *
 * @author Marco
 */
public class Trainer {

    Population pList;
    RaceAIList rList;

    int population;
    int crossover;
    int muRate;

    public Trainer(int population, int crossover, double muRate) {
        pList = new Population(population);
        rList = new RaceAIList();

        for (int i = 0; i < population; i++) {
            rList.add(new RacerAI());
        }

        this.population = population;
        this.crossover = crossover;
        this.muRate = (int) (1 / muRate);
    }

    public void train() {
        // Do a generation
        pList.doageneration(muRate, crossover);
        IndividualList indvidualList = pList.getPopulationList();

        while (!rList.trainingComplete()) {
            pList.doageneration(muRate, crossover);

            // Increment stat based on the GA gen results 
            for (int i = 0; i < pList.getPopulationList().size(); i++) {
                if (pList.getPopulationList().get(i).getMaxStat().equals("speed")) {
                    rList.get(i).incrementSpeed();
                } else if (pList.getPopulationList().get(i).getMaxStat().equals("acceleration")) {
                    rList.get(i).incrementAcceleration();
                } else {
                    rList.get(i).incrementNos();
                }

            } // --end of for every individual 

            // Lets see the results
            // Now we test out the stats!
            for (RacerAI AIraceCar : rList) {
                ImageIcon car_image = new ImageIcon(new ImageIcon(getClass().getResource("images/car1.png")).getImage());
                RaceCar raceCar = new RaceCar("AI", AIraceCar.getSpeed(), AIraceCar.getAcceleration(), (double) AIraceCar.getNos(), car_image);
                raceCar.setDistance(10);
                
                
            }
        }
        System.out.println(rList.toString());
    }

}
